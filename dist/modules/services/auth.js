"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.Auth = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../../config/db"));
const api_result_1 = require("../../utils/api-result");
const lodash_1 = __importDefault(require("lodash"));
const dotenv_1 = __importDefault(require("dotenv"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const generate_jwt_token_1 = require("../../utils/generate.jwt-token");
const middlewares_1 = require("../../middlewares");
const utils_1 = require("../../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
// JWT Config Credentials
const ACCESS_TOKEN_SECRET = env_config_1.default.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = env_config_1.default.REFRESH_TOKEN_SECRET || "";
// Google Config Credentials
const GOOGLE_CLIENT_ID = env_config_1.default.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = env_config_1.default.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = env_config_1.default.GOOGLE_CALLBACK_URL;
class Auth {
    /**
     * User Login API
     * @param data Login credentials
     * @returns ApiResult with user data and token
     */
    async login(data) {
        const { email, password } = data;
        const user = await db_1.default.users.findFirst({
            where: { email },
        });
        if (!user) {
            return api_result_1.ApiResult.error("Invalid credentials", 401);
        }
        const hashFromDB = String(user.password_hash).replace(/^\$2y\$/, "$2a$");
        const isMatch = await bcrypt_1.default.compare(password, hashFromDB);
        if (!isMatch) {
            return api_result_1.ApiResult.error("Invalid credentials", 401);
        }
        // Generate JWT token
        const token = await (0, generate_jwt_token_1.generateTokenPair)(user);
        const userData = {
            id: Number(user.id),
            organization_id: Number(user === null || user === void 0 ? void 0 : user.organization_id),
            name: (user === null || user === void 0 ? void 0 : user.first_name) + (user === null || user === void 0 ? void 0 : user.last_name),
            email: user === null || user === void 0 ? void 0 : user.email,
            category: user === null || user === void 0 ? void 0 : user.user_type,
            provider: "jwt",
        };
        return api_result_1.ApiResult.success({
            user: userData,
            ...token,
        }, "Login successful");
    }
    /**
     * Register a new organization admin user
     * @param orgData Organization and user data
     * @returns ApiResult with organization and user info
     */
    async register(orgData) {
        const { name, email, phone, address, organization_name, industry_name, pincode, website, timezone, plan_type, subscription_start_date, subscription_end_date, currencyid, file_storage_limit, data_storage_limit, created_at, updated_at, first_name, last_name, job_title, } = orgData;
        // Check if email already exists in the database
        const existingEmail = await db_1.default.organizations.findFirst({
            where: { email },
        });
        if (existingEmail) {
            return api_result_1.ApiResult.error("Email is already registered.", 400);
        }
        // Check if phone number already exists in the database
        const existingPhone = await db_1.default.organizations.findFirst({
            where: { phone },
        });
        if (existingPhone) {
            return api_result_1.ApiResult.error("Phone number is already registered.", 400);
        }
        // Generate salt for hashing password
        const salt = await bcrypt_1.default.genSalt(10);
        // Generate a random 4-digit password
        const password = Math.floor(Math.random() * 9000 + 1000).toString();
        // Hash the generated password
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        // Perform database operations in a transaction
        try {
            const result = await db_1.default.$transaction(async (trx) => {
                // Create a new organization record
                const org = await trx.organizations.create({
                    data: {
                        name,
                        email,
                        phone,
                        address,
                        organization_name,
                        industry_name,
                        pincode,
                        plan_type,
                        website,
                        timezone,
                        subscription_start_date,
                        subscription_end_date,
                        currencyid,
                        file_storage_limit,
                        data_storage_limit,
                        created_at,
                        updated_at,
                    },
                });
                // Create a new user record linked to the organization
                const user = await trx.users.create({
                    data: {
                        organization_id: org.id,
                        email,
                        password_hash: hashedPassword,
                        first_name,
                        last_name,
                        phone,
                        user_type: "ADMIN",
                        job_title,
                        created_at,
                        updated_at,
                    },
                });
                // Return organization and user info
                return {
                    organization: {
                        id: Number(org.id),
                        name: org.name,
                        organization_name: org.organization_name,
                        industry_name: org.industry_name,
                    },
                    user: {
                        id: Number(user.id),
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                    },
                };
            });
            return api_result_1.ApiResult.success(result, "Registration successful", 201);
        }
        catch (error) {
            return api_result_1.ApiResult.error(`Registration failed: ${error.message}`, 500);
        }
    }
    /**
     * Fetch a user details
     * @param userData user id
     * @returns ApiResult with organization and user info
     */
    async me(userData) {
        const { id } = userData;
        try {
            const result = await db_1.default.$transaction(async (trx) => {
                const user = await trx.users.findFirst({
                    where: {
                        id: Number(id),
                    },
                    include: {
                        organizations: true,
                    },
                });
                if (lodash_1.default.isEmpty(user)) {
                    return api_result_1.ApiResult.success({}, "No data retrieved", 204);
                }
                // Stringify bigint values in the JSON
                const stringifyResult = await (0, middlewares_1.stringifyBigInts)(user);
                return api_result_1.ApiResult.success({ ...stringifyResult }, "Users data retrieved", 200);
            });
            return result;
        }
        catch (error) {
            return api_result_1.ApiResult.error(`Registration failed: ${error.message}`, 500);
        }
    }
    /**
     * Generate a Access Token
     * @param refreshToken Token
     * @returns ApiResult with organization and user info
     */
    async refreshAccessToken(refreshToken) {
        if (!refreshToken) {
            return api_result_1.ApiResult.error("Refresh token is required", 401);
        }
        try {
            // Verify refresh token
            const verifyToken = await (0, generate_jwt_token_1.verifyRefreshToken)(refreshToken);
            if (!verifyToken || !verifyToken.id) {
                return api_result_1.ApiResult.error("Invalid refresh token", 401);
            }
            // Find user
            const user = await db_1.default.users.findUnique({
                where: { id: Number(verifyToken.id) },
            });
            if (!user) {
                return api_result_1.ApiResult.error("User not found", 401);
            }
            const generateAccessToken = await (0, generate_jwt_token_1.generateJWTToken)(user);
            return api_result_1.ApiResult.success(generateAccessToken, "Token refreshed successfully");
        }
        catch (error) {
            console.error("Token refresh error:", error);
            return api_result_1.ApiResult.error(error instanceof Error ? error.message : "Invalid refresh token", 401);
        }
    }
    /**
     * Generate a Sign Up
     * @param data Token
     * @returns ApiResult with organization and user info
     */
    async authRegister(data) {
        const { first_name, last_name, email, phone, password } = data;
        try {
            await db_1.default.$transaction(async (trx) => {
                const organization = await trx.organizations.create({
                    data: {
                        name: first_name + last_name,
                        email,
                        phone,
                    },
                });
                const { hashedPassword } = await (0, utils_1.getHashPassword)(password);
                await trx.users.create({
                    data: {
                        organization_id: organization.id,
                        email,
                        phone,
                        user_type: "ADMIN",
                        password_hash: hashedPassword,
                    },
                });
            });
            return api_result_1.ApiResult.success({}, "Signup successful", 201);
        }
        catch (error) {
            console.log("signUp Error", error);
            return api_result_1.ApiResult.error("Failed to sign up", 401);
        }
    }
    async checkAlreadyExistUser(email) {
        try {
            const userExist = await db_1.default.users.findFirst({
                where: {
                    email: email
                }
            });
            const stringifyData = await (0, middlewares_1.stringifyBigInts)(userExist);
            return stringifyData;
        }
        catch (error) {
            console.log("checkAlreadyExistUser Error", error);
        }
    }
    async googleSignUp(data) {
        const { first_name, last_name, email } = data;
        try {
            const result = await db_1.default.$transaction(async (trx) => {
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
                const user_id = users.id;
                return { user_id };
            });
            return result;
        }
        catch (error) {
            console.log('googleSignUp Error', error);
        }
    }
    async organizationRegister(data) {
        const { first_name, last_name, organization_name, industry_name, email, phone, pincode, password, job_title, website, address, date_time } = data;
        // Check if email already exists in the database
        const existingEmail = await db_1.default.users.findFirst({
            where: { email },
        });
        // If email exists, return error
        if (existingEmail) {
            return api_result_1.ApiResult.error("Email is already registered.", 400);
        }
        // Check if phone number already exists in the database
        const existingPhone = await db_1.default.users.findFirst({
            where: { phone },
        });
        // If phone exists, return error
        if (existingPhone) {
            return api_result_1.ApiResult.error("Phone number is already registered.", 400);
        }
        try {
            // Using transaction is good practice, though for a single operation it's not strictly necessary
            await db_1.default.$transaction(async (trx) => {
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
                const { hashedPassword } = await (0, utils_1.getHashPassword)(password);
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
            return api_result_1.ApiResult.success({}, // Return at least the ID for reference
            'Organization registration successful');
        }
        catch (error) {
            console.error("Organization registration error:", error);
            return api_result_1.ApiResult.error("Failed to register organization", 500); // 500 for server errors
        }
    }
    async verifyAccessToken(token) {
        try {
            // verify token 
            const decoded = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
            return api_result_1.ApiResult.success({ decoded }, "Token verified successful", 200);
        }
        catch (error) {
            return api_result_1.ApiResult.error("Failed to verify token", 200);
        }
    }
    async handleGoogleUser(data) {
        const { email, first_name, last_name, provider } = data;
        console.log("Google user data:", data);
        try {
            // Check if user exists
            const existingUser = await db_1.default.users.findFirst({
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
                return await (0, generate_jwt_token_1.generateTokenPair)(userData);
            }
            // Create new user and organization if user doesn't exist
            const result = await db_1.default.$transaction(async (trx) => {
                // Create organization
                const organization = await trx.organizations.create({
                    data: {
                        name: `${first_name} ${last_name}`.trim(),
                        email
                    }
                });
                // Create user
                const user = await trx.users.create({
                    data: {
                        organization_id: organization.id,
                        first_name,
                        last_name,
                        email,
                        user_type: 'ADMIN' // Added default user type
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
                return await (0, generate_jwt_token_1.generateTokenPair)(userData);
            });
            return result;
        }
        catch (error) {
            console.error("Error in handleGoogleUser:", error);
            throw error; // Re-throw the error to handle it in the calling function
        }
    }
}
exports.Auth = Auth;
exports.authService = new Auth();
