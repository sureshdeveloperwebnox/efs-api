"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWTToken = generateJWTToken;
exports.generateRefreshToken = generateRefreshToken;
exports.generateTokenPair = generateTokenPair;
exports.verifyRefreshToken = verifyRefreshToken;
const env_config_1 = __importDefault(require("../config/env.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// JWT Config Credentials
const ACCESS_TOKEN_SECRET = env_config_1.default.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = env_config_1.default.ACCESS_TOKEN_EXPIRES_IN;
const REFRESH_TOKEN_SECRET = env_config_1.default.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRES_IN = env_config_1.default.REFRESH_TOKEN_EXPIRES_IN || '7d';
/**
 * Generate an access JWT token
 * @param data User data to include in token payload
 * @returns JWT access token
 */
async function generateJWTToken(data) {
    const payload = {
        id: Number(data.id),
        name: data.name || data.first_name, // Handle both name formats
        email: data.email,
        phone: data.phone
    };
    console.log('ACCESS_TOKEN_EXPIRES_IN', ACCESS_TOKEN_EXPIRES_IN);
    const signOptions = {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    };
    return jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, signOptions);
}
/**
 * Generate a refresh token
 * @param data User data to include in token payload
 * @returns JWT refresh token
 */
async function generateRefreshToken(data) {
    const payload = {
        id: Number(data.id),
        tokenType: 'refresh'
    };
    const signOptions = {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    };
    return jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, signOptions);
}
/**
 * Generate both access and refresh tokens
 * @param data User data to include in token payloads
 * @returns Object containing access and refresh tokens
 */
async function generateTokenPair(data) {
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
async function verifyRefreshToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
        // Validate that this is actually a refresh token
        if (decoded.tokenType !== 'refresh') {
            return null;
        }
        return decoded;
    }
    catch (error) {
        return null;
    }
}
