"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWTToken = generateJWTToken;
const env_config_1 = __importDefault(require("../config/env.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// JWT Config Credentials
const JWT_SECRET = env_config_1.default.ACCESS_TOKEN_SECRET;
const JWT_EXPIRES_IN = env_config_1.default.JWT_EXPIRES_IN;
// JWT Token Generation
async function generateJWTToken(data) {
    const payload = {
        id: Number(data.id),
        name: data.name,
        email: data.email,
        phone: data.phone
    };
    const signOptions = {
        expiresIn: JWT_EXPIRES_IN,
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, signOptions);
}
