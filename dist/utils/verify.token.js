"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const env_config_1 = __importDefault(require("../config/env.config"));
const ACCESS_TOKEN_SECRET = env_config_1.default.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = env_config_1.default.REFRESH_TOKEN_SECRET;
const GOOGLE_TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo";
async function verifyAccessToken(token) {
    // Try JWT verification first
    try {
        console.log('token', token);
        // This must match how the token is generated in generateJWTToken or generateTokenPair
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
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
    }
    catch (jwtError) {
        console.log("JWT verification failed, trying Google token:", jwtError instanceof Error ? jwtError.message : "Unknown error");
        // Continue to Google token verification if JWT verification fails
    }
    // Try verifying Google access token
    try {
        const response = await axios_1.default.get(GOOGLE_TOKEN_INFO_URL, {
            params: { access_token: token },
        });
        const data = response.data;
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
    }
    catch (googleError) {
        console.log("Google token verification failed:", googleError instanceof Error ? googleError.message : "Unknown error");
        throw new Error("Invalid token");
    }
}
function verifyRefreshToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
    }
    catch (error) {
        console.log("Refresh token verification failed:", error instanceof Error ? error.message : "Unknown error");
        throw error;
    }
}
