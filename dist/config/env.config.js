"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envConfig = {
    DATABASE_URL: process.env.DATABASE_URL || '',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || '',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'fdzzfz',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'sdddddddddddddd',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h'
};
exports.default = envConfig;
