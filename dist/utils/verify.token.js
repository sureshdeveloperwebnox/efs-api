"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
// utils/verifyToken.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const api_result_1 = require("./api-result");
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo";
async function verifyAccessToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (typeof decoded !== "object" || decoded === null) {
            throw new Error("Invalid JWT payload");
        }
        return {
            provider: "jwt",
            ...decoded,
        };
    }
    catch (_) { }
    // 2. Try verifying Google access token
    try {
        const { data } = await axios_1.default.get(GOOGLE_TOKEN_INFO_URL, {
            params: { access_token: token },
        });
        if (!data.sub)
            throw new Error("Invalid Google token");
        return api_result_1.ApiResult.success({}, 'Succeful', 200);
    }
    catch (err) {
        return api_result_1.ApiResult.error('Invalid token', 500);
    }
}
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
