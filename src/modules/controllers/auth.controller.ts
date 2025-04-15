import { RequestX } from "../../utils/request.interface";
import { Controller, POST, GET, Validate, DELETE } from "../../decorators";
import { Login, authRegister, organizationRegisterValidation } from "../rules";
import { Auth } from "../services/auth";
import { ApiResult } from "../../utils/api-result";
import passport from "passport";
import { NextFunction, Response } from "express";
import { stringifyBigInts } from "../../middlewares";

@Controller("/auth")
export class AuthController {
  private auth!: Auth;

  constructor() {
    this.auth = new Auth(); 
  }

  // POST Organization User Register API
  @POST('/register')
  @Validate([organizationRegisterValidation]) // Organization Admin User Validation Schema
  public async register(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.auth.register(req.body);
      result.send(res);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      ApiResult.error(message, 400).send(res);
    }
  }

  // GET Google User Registration API
  @GET("/google")
  public initiateGoogleAuth(req: RequestX, res: Response, next: NextFunction) {
    const state =
      typeof req.query.redirectUrl === "string"
        ? req.query.redirectUrl
        : undefined;

    return passport.authenticate("google", {
      scope: ["profile", "email"],
      state: state,
      accessType: 'offline',  // Add this to request refresh token
      prompt: 'consent'       //
    })(req, res, next);
  }

  // Get Google User Regisration Callback API
  @GET("/google/callback")
  public handleGoogleCallback(
    req: RequestX,
    res: Response,
    next: NextFunction
  ) {
    passport.authenticate(
      "google",
      {
        failureRedirect: "/login",
        session: false,
      },
      async (err: Error | null, user: any, info?: any) => {
        try {
          if (err) {
            console.error("🚨 Passport Error:", err);
            throw err;
          }

          if (!user) {
            console.error(
              "🚫 No user returned from Google Strategy. Info:",
              info
            );
            throw new Error("Authentication failed: No user returned");
          }

          console.log("✅ Authenticated User:", user);

          const stringifydata = await stringifyBigInts(user)

          const result = await this.auth.handleGoogleAuthSuccess(stringifydata);
          result.send(res);
        } catch (error: any) {
          console.error("🔥 Google login failed:", error);
          ApiResult.error("Google login failed", 500).send(res);
        }
      }
    )(req, res, next);
  }

  // POST User Login API
  @POST("/login")
  @Validate([Login]) // Validation Schema
  public async login(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.auth.login(req.body);
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 400).send(res);
    }
  }

  //GET Me User Info API
  @GET('/me')
  public async me(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.auth.me(req.body);
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 400).send(res);
    }
  }

  //POST Refresh Token Generation API
   // POST Refresh Token API
   @POST("/refresh-token")
   public async refreshToken(req: RequestX, res: Response): Promise<void> {
     try {
       // Get refresh token from cookie or request body
       const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
       
       if (!refreshToken) {
         ApiResult.error('Refresh token is required', 401).send(res);
         return;
       }
       
       const result = await this.auth.refreshAccessToken(refreshToken);
       result.send(res);
     } catch (error: any) {
       console.error("🔄 Token refresh failed:", error);
       ApiResult.error(error.message || 'Token refresh failed', 401).send(res);
     }
   }

}
