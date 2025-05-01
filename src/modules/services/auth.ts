// src/services/auth-service.ts
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import dotenv from "dotenv";
import envConfig from "../../config/env.config";
import {
  generateJWTToken,
  generateTokenPair,
  verifyRefreshToken,
} from "../../utils/generate.jwt-token";
import { stringifyBigInts } from "../../middlewares";
import { IRegisterModel, ISignUpModel, IUserLogin } from "../model";
import { getHashPassword } from "../../utils";

dotenv.config();

// JWT Config Credentials
const ACCESS_TOKEN_SECRET = envConfig.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = envConfig.REFRESH_TOKEN_SECRET || "";

// Google Config Credentials
const GOOGLE_CLIENT_ID = envConfig.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = envConfig.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = envConfig.GOOGLE_CALLBACK_URL;

export class Auth {
  constructor() {
    this.initializePassport();
  }

  private initializePassport(): void {
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ACCESS_TOKEN_SECRET,
    };

    passport.use(
      new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
          const user = await prisma.users.findUnique({
            where: { id: jwtPayload.id },
          });

          if (user) {
            return done(null, user);
          }
          return done(null, false);
        } catch (error) {
          return done(error, false);
        }
      })
    );

    if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_CALLBACK_URL) {
      passport.use(
        new GoogleStrategy(
          {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
          },
          async (req, accessToken, refreshToken, profile, done) => {
            try {
              // Fix incorrect assignment of name fields
              const first_name = profile._json.given_name || "";
              const last_name = profile._json.family_name || "";
              const email = profile._json.email || "";
              const provider = profile.provider;

              let userData = await prisma.users.findFirst({
                where: { email },
              });

              if (!_.isEmpty(userData)) {
                const response = {
                  ...userData,
                  provider,
                  accessToken,
                  refreshToken,
                };
                return done(null, response);
              }

              const data = {
                email,
                first_name,
                last_name,
                provider,
                accessToken,
                refreshToken,
              };

              return done(null, data);
            } catch (error) {
              return done(error);
            }
          }
        )
      );
    } else {
      console.warn(
        "Google OAuth credentials missing. Google authentication strategy not initialized."
      );
    }

    passport.serializeUser((data: any, done) => {
      done(null, data);
    });

    passport.deserializeUser(async (id: number, done) => {
      try {
        const user = await prisma.users.findFirst({
          where: { id },
        });
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    });
  }

  /**
   * User Login API
   * @param data Login credentials
   * @returns ApiResult with user data and token
   */
  public async login(data: IUserLogin): Promise<ApiResult> {
    const { email, password } = data;

    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      return ApiResult.error("Invalid credentials", 401);
    }

    const hashFromDB = String(user.password_hash).replace(/^\$2y\$/, "$2a$");
    const isMatch = await bcrypt.compare(password, hashFromDB);

    if (!isMatch) {
      return ApiResult.error("Invalid credentials", 401);
    }

    // Generate JWT token
    const token = await generateTokenPair(user);

    const userData = {
      id: Number(user.id),
      name: user?.first_name,
      email: user?.email,
      category: user?.user_type,
      provider: "jwt",
    };

    return ApiResult.success(
      {
        ...userData,
        ...token,
      },
      "Login successful"
    );
  }

  /**
   * Handle successful Google authentication
   * @param data Google user data
   * @returns ApiResult with user data
   */
  public async handleGoogleAuthSuccess(data: any): Promise<ApiResult> {

    const { email } = data;

    const checkUser = await this.checkAlreadyExistUser(email);
    if (!checkUser) {
      const createGoogleSignUp = await this.googleSignUp(data);
      return ApiResult.success(
        {
          ...data,
          userid: createGoogleSignUp?.user_id
        },
        "Google authentication successful",
        200
      );
    }

    return ApiResult.success(
      {
        ...data,
        user_id: checkUser.id
      },
      "Google authentication successful",
      200
    );
  }

  /**
   * Authenticate JWT token
   * @returns Passport JWT authentication middleware
   */
  public authenticateJwt() {
    return passport.authenticate("jwt", { session: false });
  }

  /**
   * Authenticate with Google
   * @param options Google authentication options
   * @returns Google authentication middleware
   */
  public authenticateGoogle(options = { scope: ["profile", "email"] }) {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
      return (req: Request, res: Response) => {
        return ApiResult.error(
          "Google authentication is not configured",
          501
        ).send(res);
      };
    }
    return passport.authenticate("google", options);
  }

  /**
   * Google authentication callback
   * @returns Google callback middleware
   */
  public googleCallback() {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
      return (req: Request, res: Response) => {
        return ApiResult.error(
          "Google authentication is not configured",
          501
        ).send(res);
      };
    }
    return passport.authenticate("google", {
      session: false,
      failureRedirect: "/login",
    });
  }

  /**
   * Protect routes with JWT authentication
   * @param customHandler Optional custom handler after authentication
   * @returns JWT protection middleware
   */
  public jwtProtect(
    customHandler?: (req: Request, res: Response, next: NextFunction) => void
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate(
        "jwt",
        { session: false },
        (err: any, user: any, info: any) => {
          if (err) return next(err);
          if (!user)
            return ApiResult.error("Unauthorized access", 401).send(res);

          req.user = user;
          if (customHandler) return customHandler(req, res, next);
          return next();
        }
      )(req, res, next);
    };
  }

  /**
   * Register a new organization admin user
   * @param orgData Organization and user data
   * @returns ApiResult with organization and user info
   */
  public async register(orgData: IRegisterModel): Promise<ApiResult> {
    const {
      name,
      email,
      phone,
      address,
      organization_name,
      industry_name,
      pincode,
      website,
      timezone,
      plan_type,
      subscription_start_date,
      subscription_end_date,
      currencyid,
      file_storage_limit,
      data_storage_limit,
      created_at,
      updated_at,
      first_name,
      last_name,
      job_title,
    } = orgData;

    // Check if email already exists in the database
    const existingEmail = await prisma.organizations.findFirst({
      where: { email },
    });

    if (existingEmail) {
      return ApiResult.error("Email is already registered.", 400);
    }

    // Check if phone number already exists in the database
    const existingPhone = await prisma.organizations.findFirst({
      where: { phone },
    });

    if (existingPhone) {
      return ApiResult.error("Phone number is already registered.", 400);
    }

    // Generate salt for hashing password
    const salt = await bcrypt.genSalt(10);

    // Generate a random 4-digit password
    const password = Math.floor(Math.random() * 9000 + 1000).toString();

    // Hash the generated password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Perform database operations in a transaction
    try {
      const result = await prisma.$transaction(async (trx: any) => {
        // Create a new organization record
        const org = await trx.organizations.create({
          data: {
            name,
            email,
            phone,
            address,
            organization_name,
            industry_name,
            pincode,
            plan_type,
            website,
            timezone,
            subscription_start_date,
            subscription_end_date,
            currencyid,
            file_storage_limit,
            data_storage_limit,
            created_at,
            updated_at,
          },
        });

        // Create a new user record linked to the organization
        const user = await trx.users.create({
          data: {
            organization_id: org.id,
            email,
            password_hash: hashedPassword,
            first_name,
            last_name,
            phone,
            user_type: "ADMIN",
            job_title,
            created_at,
            updated_at,
          },
        });

        // Return organization and user info
        return {
          organization: {
            id: Number(org.id),
            name: org.name,
            organization_name: org.organization_name,
            industry_name: org.industry_name,
          },
          user: {
            id: Number(user.id),
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          },
        };
      });

      return ApiResult.success(result, "Registration successful", 201);
    } catch (error: any) {
      return ApiResult.error(`Registration failed: ${error.message}`, 500);
    }
  }

  /**
   * Fetch a user details
   * @param userData user id
   * @returns ApiResult with organization and user info
   */
  public async me(userData: any): Promise<ApiResult> {
    const { id } = userData;
    try {
      const result = await prisma.$transaction(async (trx: any) => {
        const user = await trx.users.findFirst({
          where: {
            id: Number(id),
          },
          include: {
            organizations: true,
          },
        });
        if (_.isEmpty(user)) {
          return ApiResult.success({}, "No data retrieved", 204);
        }

        // Stringify bigint values in the JSON
        const stringifyResult = await stringifyBigInts(user);

        return ApiResult.success(
          { ...stringifyResult },
          "Users data retrieved",
          200
        );
      });

      return result;
    } catch (error: any) {
      return ApiResult.error(`Registration failed: ${error.message}`, 500);
    }
  }

  /**
   * Generate a Access Token
   * @param refreshToken Token
   * @returns ApiResult with organization and user info
   */
  public async refreshAccessToken(refreshToken: string): Promise<ApiResult> {
    if (!refreshToken) {
      return ApiResult.error("Refresh token is required", 401);
    }

    try {
      // Verify refresh token
      const verifyToken = await verifyRefreshToken(refreshToken);

      if (!verifyToken || !verifyToken.id) {
        return ApiResult.error("Invalid refresh token", 401);
      }

      // Find user
      const user = await prisma.users.findUnique({
        where: { id: Number(verifyToken.id) },
      });

      if (!user) {
        return ApiResult.error("User not found", 401);
      }

      const generateAccessToken = await generateJWTToken(user);

      return ApiResult.success(
        generateAccessToken,
        "Token refreshed successfully"
      );
    } catch (error) {
      console.error("Token refresh error:", error);
      return ApiResult.error(
        error instanceof Error ? error.message : "Invalid refresh token",
        401
      );
    }
  }

  /**
   * Generate a Sign Up
   * @param data Token
   * @returns ApiResult with organization and user info
   */
  public async authRegister(data: ISignUpModel): Promise<ApiResult> {
    const { first_name, last_name, email, phone, password } = data;

    try {
      await prisma.$transaction(async (trx) => {
        const organization = await trx.organizations.create({
          data: {
            name: first_name + last_name,
            email,
            phone,
          },
        });

        const { hashedPassword } = await getHashPassword(password);

        await trx.users.create({
          data: {
            organization_id: organization.id,
            email,
            phone,
            user_type: "ADMIN",
            password_hash: hashedPassword,
          },
        });
      });

      return ApiResult.success({}, "Signup successful", 201);
    } catch (error: any) {
      console.log("signUp Error", error);
      return ApiResult.error("Failed to sign up", 401);
    }
  }

  public async checkAlreadyExistUser(email: string) {
    try {
      const userExist = await prisma.users.findFirst({
        where: {
          email: email
        }
      });
      const stringifyData = await stringifyBigInts(userExist);
      return stringifyData;
    } catch (error) {
      console.log("checkAlreadyExistUser Error", error);
    }
  }


  public async googleSignUp(data: any) {
    const { first_name, last_name, email } = data;
    try {
      const result = await prisma.$transaction(async (trx) => {
        // Insert Organization
        const organization = await trx.organizations.create({
          data: {
            name: first_name + last_name,
            email
          },
        });

        // Insert Users
        const users = await trx.users.create({
          data: {
            organization_id: organization.id,
            first_name,
            last_name,
            email
          }
        });

        const user_id = users.id

        return { user_id };
      });
      return result;
    } catch (error: any) {
      console.log('googleSignUp Error', error);
    }
  }
  public async organizationRegister(data: any): Promise<ApiResult> {
    const {
      organization_name,
      industry_name,
      email,
      pincode,
      website,
      address
    } = data;
  
    // Basic validation
    if (!organization_name || !industry_name || !pincode) {
      return ApiResult.error("Required fields are missing", 400);
    }
  
    try {
      // Using transaction is good practice, though for a single operation it's not strictly necessary
      await prisma.$transaction(async (trx) => {
        return await trx.organizations.create({
          data: {
            name: organization_name,
            email: email,
            organization_name,
            industry_name,
            pincode,
            website: website || null, // Convert empty string to null
            address: address || null  // Convert empty string to null
          }
        });
      });
  
      return ApiResult.success(
        {  }, // Return at least the ID for reference
        'Organization registration successful'
      );
    } catch (error: any) {
      console.error("Organization registration error:", error);
      return ApiResult.error("Failed to register organization", 500); // 500 for server errors
    }
  }

}

export const authService = new Auth();
