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
import { Prisma } from '@prisma/client';

import {
  generateJWTToken,
  generateTokenPair,
  verifyRefreshToken,
} from "../../utils/generate.jwt-token";
import { stringifyBigInts } from "../../middlewares";
import { IRegisterModel,  IUserLogin } from "../model";
import { getHashPassword } from "../../utils";
import jwt from 'jsonwebtoken';

dotenv.config();

// JWT Config Credentials
const ACCESS_TOKEN_SECRET = envConfig.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = envConfig.REFRESH_TOKEN_SECRET || "";

// Google Config Credentials
const GOOGLE_CLIENT_ID = envConfig.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = envConfig.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = envConfig.GOOGLE_CALLBACK_URL;

export class Auth {

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
      organization_id: Number(user?.organization_id),
      name: user?.first_name + user?.last_name,
      email: user?.email,
      category: user?.user_type,
      provider: "jwt",
    };

    return ApiResult.success(
      {
        user: userData,
        ...token,
      },
      "Login successful"
    );
  }
  

  // /**
  //  * Register a new organization admin user
  //  * @param orgData Organization and user data
  //  * @returns ApiResult with organization and user info
  //  */
  // public async register(orgData: IRegisterModel): Promise<ApiResult> {
  //   const {
  //     name,
  //     email,
  //     phone,
  //     address,
  //     organization_name,
  //     industry_name,
  //     pincode,
  //     website,
  //     timezone,
  //     plan_type,
  //     subscription_start_date,
  //     subscription_end_date,
  //     currencyid,
  //     file_storage_limit,
  //     data_storage_limit,
  //     date_time,
  //     first_name,
  //     last_name,
  //     job_title,
  //   } = orgData;

  //   // Check if email already exists in the database
  //   const existingEmail = await prisma.organizations.findFirst({
  //     where: { email },
  //   });

  //   if (existingEmail) {
  //     return ApiResult.error("Email is already registered.", 400);
  //   }

  //   // Check if phone number already exists in the database
  //   const existingPhone = await prisma.organizations.findFirst({
  //     where: { phone },
  //   });

  //   if (existingPhone) {
  //     return ApiResult.error("Phone number is already registered.", 400);
  //   }

  //   // Generate salt for hashing password
  //   const salt = await bcrypt.genSalt(10);

  //   // Generate a random 4-digit password
  //   const password = Math.floor(Math.random() * 9000 + 1000).toString();

  //   // Hash the generated password
  //   const hashedPassword = await bcrypt.hash(password, salt);

  //   // Perform database operations in a transaction
  //   try {
  //     const result = await prisma.$transaction(async (trx: Prisma.TransactionClient) => {
  //       // Create a new organization record
  //       const org = await trx.organizations.create({
  //         data: {
  //           name,
  //           email,
  //           phone,
  //           address,
  //           organization_name,
  //           industry_name,
  //           pincode,
  //           plan_type,
  //           website,
  //           timezone,
  //           subscription_start_date,
  //           subscription_end_date,
  //           currencyid,
  //           file_storage_limit,
  //           data_storage_limit,
  //           created_at: date_time,
  //         },
  //       });

  //       // Create a new user record linked to the organization
  //       const user = await trx.users.create({
  //         data: {
  //           organization_id: org.id,
  //           email,
  //           password_hash: hashedPassword,
  //           first_name,
  //           last_name,
  //           phone,
  //           user_type: "ADMIN",
  //           job_title,
  //           created_at: date_time,
  //         },
  //       });

  //       // Return organization and user info
  //       return {
  //         organization: {
  //           id: Number(org.id),
  //           name: org.name,
  //           organization_name: org.organization_name,
  //           industry_name: org.industry_name,
  //         },
  //         user: {
  //           id: Number(user.id),
  //           email: user.email,
  //           first_name: user.first_name,
  //           last_name: user.last_name,
  //         },
  //       };
  //     });

  //     return ApiResult.success(result, "Registration successful", 201);
  //   } catch (error: any) {
  //     return ApiResult.error(`Registration failed: ${error.message}`, 500);
  //   }
  // }

  

  /**
   * Fetch a user details
   * @param userData user id
   * @returns ApiResult with organization and user info
   */
  public async me(userData: any): Promise<ApiResult> {
    const { id } = userData;
    try {
      const result = await prisma.$transaction(async (trx: Prisma.TransactionClient) => {
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
   * Generate a Register
   * @param data Token
   * @returns ApiResult with Register and Register
   */
  public async register(data: IRegisterModel): Promise<ApiResult> {
    const { first_name, last_name, email, phone, password, user_type, date_time } = data;

    try {

        // Check if email already exists in the database
    const existingEmail = await prisma.users.findFirst({
      where: { email },
    });

    // If email exists, return error
    if (existingEmail) {
      return ApiResult.error("Email is already registered.", 400);
    }

    // Check if phone number already exists in the database
    const existingPhone = await prisma.users.findFirst({
      where: { phone },
    });

    // If phone exists, return error
    if (existingPhone) {
      return ApiResult.error("Phone number is already registered.", 400);
    }

    
      await prisma.$transaction(async (trx: Prisma.TransactionClient) => {
        const organization = await trx.organizations.create({
          data: {
            name: first_name + last_name,
            email,
            phone,
            created_at: date_time
          },
        });

        const { hashedPassword } = await getHashPassword(password);

        await trx.users.create({
          data: {
            organization_id: organization.id,
            first_name,
            last_name,
            email,
            phone,
            user_type: user_type,
            password_hash: hashedPassword,
            created_at: date_time
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
      const result = await prisma.$transaction(async (trx: Prisma.TransactionClient) => {
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
      first_name,
      last_name,
      organization_name,
      industry_name,
      email,
      phone,
      pincode,
      password,
      job_title,
      website,
      address,
      date_time
    } = data;

    // Check if email already exists in the database
    const existingEmail = await prisma.users.findFirst({
      where: { email },
    });

    // If email exists, return error
    if (existingEmail) {
      return ApiResult.error("Email is already registered.", 400);
    }

    // Check if phone number already exists in the database
    const existingPhone = await prisma.users.findFirst({
      where: { phone },
    });

    // If phone exists, return error
    if (existingPhone) {
      return ApiResult.error("Phone number is already registered.", 400);
    }


    try {
      // Using transaction is good practice, though for a single operation it's not strictly necessary
      await prisma.$transaction(async (trx: any) => {

        // Create a new organization record
        const organization = await trx.organizations.create({
          data: {
            name: first_name + last_name,
            email,
            phone,
            address,
            organization_name,
            industry_name,
            pincode,
            plan_type: "FREE",
            website,
            created_at: date_time,
          },
        });

        //Generate hashed password
        const { hashedPassword } = await getHashPassword(password);


        // Create a new user record linked to the organization
        const user = await trx.users.create({
          data: {
            organization_id: organization.id,
            email: organization.email,
            password_hash: hashedPassword,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            user_type: "ADMIN",
            job_title: job_title,
            created_at: date_time
          },
        });

      });

      return ApiResult.success(
        {}, // Return at least the ID for reference
        'Organization registration successful'
      );
    } catch (error: any) {
      console.error("Organization registration error:", error);
      return ApiResult.error("Failed to register organization", 500); // 500 for server errors
    }
  }

  public async verifyAccessToken(token: string): Promise<ApiResult> {
    try {
      // verify token 
      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
      return ApiResult.success({ decoded }, "Token verified successful", 200)
    } catch (error: any) {
      return ApiResult.error("Failed to verify token", 200)

    }
  }

  public async handleGoogleUser(data: any) {
    const { email, firstName, lastName, provider } = data;
    console.log("Google user data:", data);

    try {
      // Check if user exists
      const existingUser = await prisma.users.findFirst({
        where: { email }
      });

      if (existingUser) {
        const userData = {
          id: Number(existingUser.id),
          organization_id: Number(existingUser.organization_id),
          name: `${existingUser.first_name || ""} ${existingUser.last_name || ""}`.trim(),
          email: existingUser.email,
          category: existingUser.user_type,
          provider: provider,
        };
        return await generateTokenPair(userData);
      }

      const date_time = new Date().toISOString()

      // Create new user and organization if user doesn't exist
      const result = await prisma.$transaction(async (trx: Prisma.TransactionClient) => {
        // Create organization
        const organization = await trx.organizations.create({
          data: {
            name: `${firstName} ${lastName}`.trim(),
            email: email,
            created_at: date_time
          }
        });

        // Create user
        const user = await trx.users.create({
          data: {
            organization_id: organization.id,
            first_name: firstName,
            last_name: lastName,
            email,
            user_type: 'ADMIN', // Added default user type
            created_at: date_time
          }
        });

        const userData = {
          id: Number(user.id),
          organization_id: Number(user.organization_id),
          name: `${user.first_name} ${user.last_name}`.trim(),
          email: user.email,
          category: user.user_type,
          provider: provider,
        };

        return await generateTokenPair(userData);
      });

      return result;

    } catch (error) {
      console.error("Error in handleGoogleUser:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  }

}

export const authService = new Auth();
