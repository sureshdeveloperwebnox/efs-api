"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.Auth = void 0;
// src/services/auth-service.ts
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../../config/db"));
const api_result_1 = require("../../utils/api-result");
const lodash_1 = __importDefault(require("lodash"));
const dotenv_1 = __importDefault(require("dotenv"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const generate_jwt_token_1 = require("../../utils/generate.jwt-token");
const middlewares_1 = require("../../middlewares");
dotenv_1.default.config();
// JWT Config Credentials
const ACCESS_TOKEN_SECRET = env_config_1.default.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = env_config_1.default.REFRESH_TOKEN_SECRET || "";
// Google Config Credentials
const GOOGLE_CLIENT_ID = env_config_1.default.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = env_config_1.default.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = env_config_1.default.GOOGLE_CALLBACK_URL;
class Auth {
    constructor() {
        this.initializePassport();
    }
    initializePassport() {
        const jwtOptions = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: ACCESS_TOKEN_SECRET,
        };
        passport_1.default.use(new passport_jwt_1.Strategy(jwtOptions, async (jwtPayload, done) => {
            try {
                const user = await db_1.default.users.findUnique({
                    where: { id: jwtPayload.id },
                });
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            }
            catch (error) {
                return done(error, false);
            }
        }));
        if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_CALLBACK_URL) {
            passport_1.default.use(new passport_google_oauth20_1.Strategy({
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: GOOGLE_CALLBACK_URL,
                passReqToCallback: true,
            }, async (req, accessToken, refreshToken, profile, done) => {
                try {
                    // Fix incorrect assignment of name fields
                    const first_name = profile._json.given_name || "";
                    const last_name = profile._json.family_name || "";
                    const email = profile._json.email || "";
                    const provider = profile.provider;
                    let userData = await db_1.default.users.findFirst({
                        where: { email },
                    });
                    if (!lodash_1.default.isEmpty(userData)) {
                        const response = {
                            ...userData,
                            provider,
                        };
                        return done(null, response);
                    }
                    const data = {
                        email,
                        first_name,
                        last_name,
                        provider,
                        accessToken,
                        refreshToken,
                    };
                    return done(null, data);
                }
                catch (error) {
                    return done(error);
                }
            }));
        }
        else {
            console.warn("Google OAuth credentials missing. Google authentication strategy not initialized.");
        }
        passport_1.default.serializeUser((data, done) => {
            done(null, data);
        });
        passport_1.default.deserializeUser(async (id, done) => {
            try {
                const user = await db_1.default.users.findFirst({
                    where: { id },
                });
                done(null, user);
            }
            catch (error) {
                done(error, null);
            }
        });
    }
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
            name: user === null || user === void 0 ? void 0 : user.first_name,
            email: user === null || user === void 0 ? void 0 : user.email,
            category: user === null || user === void 0 ? void 0 : user.user_type,
            provider: "jwt",
        };
        return api_result_1.ApiResult.success({
            ...userData,
            ...token,
        }, "Login successful");
    }
    /**
     * Handle successful Google authentication
     * @param data Google user data
     * @returns ApiResult with user data
     */
    async handleGoogleAuthSuccess(data) {
        return api_result_1.ApiResult.success({
            ...data,
        }, "Google authentication successful", 200);
    }
    /**
     * Authenticate JWT token
     * @returns Passport JWT authentication middleware
     */
    authenticateJwt() {
        return passport_1.default.authenticate("jwt", { session: false });
    }
    /**
     * Authenticate with Google
     * @param options Google authentication options
     * @returns Google authentication middleware
     */
    authenticateGoogle(options = { scope: ["profile", "email"] }) {
        if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
            return (req, res) => {
                return api_result_1.ApiResult.error("Google authentication is not configured", 501).send(res);
            };
        }
        return passport_1.default.authenticate("google", options);
    }
    /**
     * Google authentication callback
     * @returns Google callback middleware
     */
    googleCallback() {
        if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
            return (req, res) => {
                return api_result_1.ApiResult.error("Google authentication is not configured", 501).send(res);
            };
        }
        return passport_1.default.authenticate("google", {
            session: false,
            failureRedirect: "/login",
        });
    }
    /**
     * Protect routes with JWT authentication
     * @param customHandler Optional custom handler after authentication
     * @returns JWT protection middleware
     */
    jwtProtect(customHandler) {
        return (req, res, next) => {
            passport_1.default.authenticate("jwt", { session: false }, (err, user, info) => {
                if (err)
                    return next(err);
                if (!user)
                    return api_result_1.ApiResult.error("Unauthorized access", 401).send(res);
                req.user = user;
                if (customHandler)
                    return customHandler(req, res, next);
                return next();
            })(req, res, next);
        };
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
}
exports.Auth = Auth;
exports.authService = new Auth();
