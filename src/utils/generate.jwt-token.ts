import envConfig from "../config/env.config";
import jwt, { SignOptions } from "jsonwebtoken";

// JWT Config Credentials
const ACCESS_TOKEN_SECRET = envConfig.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = envConfig.ACCESS_TOKEN_EXPIRES_IN;
const REFRESH_TOKEN_SECRET = envConfig.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRES_IN = envConfig.REFRESH_TOKEN_EXPIRES_IN || '7d';

/**
 * Generate an access JWT token
 * @param data User data to include in token payload
 * @returns JWT access token
 */
export async function generateJWTToken(data: any): Promise<string> {
  const payload: jwt.JwtPayload = {
    user_id: Number(data.id),
    organization_id: Number(data.organization_id),
    name: data?.name || data.first_name, // Handle both name formats
    email: data?.email,
    phone: data?.phone,
    category: data?.user_type,
    provider: data?.provider

  };

  console.log('ACCESS_TOKEN_EXPIRES_IN', ACCESS_TOKEN_EXPIRES_IN);
  

  const signOptions: SignOptions = {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN as unknown as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, signOptions);
}

/**
 * Generate a refresh token
 * @param data User data to include in token payload
 * @returns JWT refresh token
 */
export async function generateRefreshToken(data: any): Promise<string> {
  const payload: jwt.JwtPayload = {
    id: Number(data.id),
    tokenType: 'refresh'
  };

  const signOptions: SignOptions = {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN as unknown as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, REFRESH_TOKEN_SECRET, signOptions);
}

/**
 * Generate both access and refresh tokens
 * @param data User data to include in token payloads
 * @returns Object containing access and refresh tokens
 */
export async function generateTokenPair(data: any): Promise<{ accessToken: string, refreshToken: string }> {
  
  const [accessToken, refreshToken] = await Promise.all([
    generateJWTToken(data),
    generateRefreshToken(data)
  ]);

  return {
    accessToken,
    refreshToken
  };
}

/**
 * Verify a refresh token
 * @param token Refresh token to verify
 * @returns Decoded token payload or null if invalid
 */
export async function verifyRefreshToken(token: string) {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;
    
    // Validate that this is actually a refresh token
    if (decoded.tokenType !== 'refresh') {
      return null;
    }
    
    return decoded;
  } catch (error) {
    return null;
  }
}


