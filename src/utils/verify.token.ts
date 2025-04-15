import jwt from "jsonwebtoken";
import axios from "axios";
import { ApiResult } from "./api-result";
import envConfig from "../config/env.config";

const ACCESS_TOKEN_SECRET = envConfig.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET  = envConfig.REFRESH_TOKEN_SECRET;
const GOOGLE_TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo";

interface GoogleTokenInfo {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
  aud?: string;
  exp?: number;
  iss?: string;
  email_verified?: boolean;
}

export async function verifyAccessToken(token: string): Promise<any> {
  // Try JWT verification first
  try {
    console.log('token', token);
    
    // This must match how the token is generated in generateJWTToken or generateTokenPair
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    console.log('decoded🔥', decoded);
    
    
    if (typeof decoded !== "object" || decoded === null) {
      console.log("Invalid JWT payload:", decoded);
      throw new Error("Invalid JWT payload");
    }

    console.log("JWT token verified successfully:", decoded);
    return {
      provider: "jwt",
      ...decoded,
    };
  } catch (jwtError) {
    console.log("JWT verification failed, trying Google token:", 
      jwtError instanceof Error ? jwtError.message : "Unknown error");
    // Continue to Google token verification if JWT verification fails
  }

  // Try verifying Google access token
  try {
    const response = await axios.get<GoogleTokenInfo>(GOOGLE_TOKEN_INFO_URL, {
      params: { access_token: token },
    });
    
    const data: GoogleTokenInfo = response.data;
    console.log("Google token response:", data);

    // Verify required fields are present
    if (!data.sub) {
      console.log("Missing subject in Google token");
      throw new Error("Invalid Google token: missing subject identifier");
    }

    return {
      provider: "google",
      id: data.sub,
      email: data.email || "",
      name: data.name || "",
      picture: data.picture || "",
    };
  } catch (googleError) {
    console.log("Google token verification failed:", 
      googleError instanceof Error ? googleError.message : "Unknown error");
    throw new Error("Invalid token");
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.log("Refresh token verification failed:", 
      error instanceof Error ? error.message : "Unknown error");
    throw error;
  }
}