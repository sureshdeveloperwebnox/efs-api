import { RequestX } from "../../utils/request.interface";
import { Controller, POST, GET, Validate, DELETE, POSTPayloadDecorator } from "../../decorators";
import { Login, OrganizationUserRegisterValidation } from "../rules";
import { Auth } from "../services/auth";
import { ApiResult } from "../../utils/api-result";
import passport from "passport";
import { NextFunction, Response } from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import envConfig from "../../config/env.config";

// Types
interface GoogleProfile {
  id: string;
  displayName: string;
  name?: { givenName?: string; familyName?: string };
  emails?: { value: string; verified?: boolean }[];
  photos?: { value: string }[];
  provider: string;
}


// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: envConfig?.GOOGLE_CLIENT_ID,
      clientSecret: envConfig?.GOOGLE_CLIENT_SECRET,
      callbackURL: envConfig?.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      proxy: true
    },
    async (request: RequestX, accessToken: string, refreshToken: string, profile: GoogleProfile, done: Function) => {
      try {
        // Here you would typically find or create a user in your database
        const user = {
          googleId: profile.id,
          email: profile.emails?.[0]?.value,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          avatar: profile.photos?.[0]?.value
        };
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

@Controller("/auth")
export class AuthController {
  private auth: Auth;

  constructor() {
    this.auth = new Auth();
  }

  private handleError(error: any, res: Response, defaultMessage: string = "Internal server error", statusCode: number = 500): void {
    console.error(error);
    const message = error.message || defaultMessage;
    const status = error.statusCode || statusCode;
    ApiResult.error(message, status).send(res);
  }

  // @POST('/register')
  // @Validate([OrganizationUserRegisterValidation])
  // public async register(req: RequestX, res: Response): Promise<void> {
  //   try {
  //     const result = await this.auth.register(req.body);
  //     result.send(res);
  //   } catch (error) {
  //     this.handleError(error, res, "Registration failed", 400);
  //   }
  // }

  @GET("/google")
  public initiateGoogleAuth(req: RequestX, res: Response, next: NextFunction): void {
    const state = req.query.redirectUrl
      ? Buffer.from(JSON.stringify({ redirectUrl: req.query.redirectUrl })).toString('base64')
      : undefined;

    const authenticator = passport.authenticate("google", {
      scope: ["profile", "email"],
      state,
      // prompt: 'consent',       
      session: false
    });
    authenticator(req, res, next);
  }

  @GET("/google/callback")
  public async handleGoogleCallback(req: RequestX, res: Response, next: NextFunction): Promise<void> {
    passport.authenticate(
      "google",
      { session: false },
      async (err: Error | null, user: any, info?: any) => {
        try {
          if (err || !user) {
            console.error("Google auth failed:", err || info);
            return res.redirect(`${envConfig.FRONTEND_LOGIN_URL}?error=authentication_failed`);
          }

          // Process user registration/login
          const tokens = await this.auth.handleGoogleUser(user);
          console.log("tokens", tokens);

          // Set secure cookies
          res.cookie('accessToken', tokens?.accessToken, {
            path: '/',
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            httpOnly: process.env.NODE_ENV === "production"
          });

          res.cookie('refreshToken', tokens?.refreshToken, {
            path: '/',
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            httpOnly: process.env.NODE_ENV === "production"
          });

          // Handle redirect
          const state = req.query.state ? JSON.parse(Buffer.from(req.query.state as string, 'base64').toString()) : {};
          const redirectUrl = envConfig.FRONTEND_DASHBOARD_URL;
          return res.redirect(redirectUrl);

        } catch (error) {
          console.error("Google callback error:", error);
          return res.redirect(`${envConfig.FRONTEND_LOGIN_URL}?error=server_error`);
        }
      }
    )(req, res, next);
  }

  // POST User Login API
  @POST("/login")
  @Validate([Login]) // Validation Schema
  public async login(req: RequestX, res: Response) {
    try {
      const result: any = await this.auth.login(req.body);

      // Set secure cookies
      res.cookie('accessToken', result?.accessToken, {
        path: '/',
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        httpOnly: process.env.NODE_ENV === "production"
      });

      res.cookie('refreshToken', result?.refreshToken, {
        path: '/',
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        httpOnly: process.env.NODE_ENV === "production"
      });

      return res.send({
        status: true,
        message: "Login Successful",
        data: result
      })

    } catch (error: any) {
      console.log('login error', error);
      ApiResult.error(error.message || "Internal server error", 400);
    }
  }


  @GET('/me')
  public async me(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.auth.me(req.user); // Assuming req.user is set by auth middleware
      result.send(res);
    } catch (error) {
      this.handleError(error, res, "Failed to fetch user data", 401);
    }
  }


  @POST("/register")
  // @POSTPayloadDecorator()
  public async register(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.auth.register(req.body);
      result.send(res);
    } catch (error) {
      this.handleError(error, res, 'Registration failed', 400);
    }
  }

  @POST('/organizationRegister')
  public async organizationRegister(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.auth.organizationRegister(req.body);
      result.send(res);
    } catch (error) {
      this.handleError(error, res, "Organization registration failed", 400);
    }
  }

  @POST("/verify-access-token")
  public async verifyAccessToken(req: RequestX, res: Response): Promise<void> {
    try {
      const accessToken = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

      if (!accessToken) {
        return ApiResult.error('Access token is required', 401).send(res);
      }

      const result = await this.auth.verifyAccessToken(accessToken);
      result.send(res);
    } catch (error) {
      this.handleError(error, res, 'Token verification failed', 401);
    }
  }


}

