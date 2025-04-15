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
dotenv_1.default.config();
// // JWT Config Credentials
const JWT_SECRET = env_config_1.default.ACCESS_TOKEN_SECRET || '';
// const JWT_EXPIRES_IN = envConfig.JWT_EXPIRES_IN || '';
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
            secretOrKey: JWT_SECRET,
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
            // console.log('GOOGLE_CLIENT_ID', GOOGLE_CLIENT_ID);
            passport_1.default.use(new passport_google_oauth20_1.Strategy({
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: GOOGLE_CALLBACK_URL,
                passReqToCallback: true,
            }, async (req, accessToken, refreshToken, profile, done) => {
                try {
                    const first_name = profile._json.family_name || '';
                    const last_name = profile._json.given_name || '';
                    const email = profile._json.email || '';
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
                    let data = {
                        email: email,
                        first_name,
                        last_name,
                        provider,
                        accessToken,
                        refreshToken
                    };
                    return done(null, data);
                }
                catch (error) {
                    return done(error);
                }
            }));
        }
        else {
            console.warn('Google OAuth credentials missing. Google authentication strategy not initialized.');
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
    // User Login API
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
        const token = await (0, generate_jwt_token_1.generateJWTToken)(user);
        return api_result_1.ApiResult.success({
            user: {
                id: Number(user.id),
                name: user.first_name,
                email: user.email,
                category: user.user_type,
                provider: 'jwt',
            },
            token,
        }, "Login successful");
    }
    async handleGoogleAuthSuccess(data) {
        return api_result_1.ApiResult.success({
            ...data,
        }, "Google authentication successful", 200);
    }
    authenticateJwt() {
        return passport_1.default.authenticate('jwt', { session: false });
    }
    authenticateGoogle(options = { scope: ['profile', 'email'] }) {
        if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
            return (req, res) => {
                return api_result_1.ApiResult.error("Google authentication is not configured", 501).send(res);
            };
        }
        return passport_1.default.authenticate('google', options);
    }
    googleCallback() {
        if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
            return (req, res) => {
                return api_result_1.ApiResult.error("Google authentication is not configured", 501).send(res);
            };
        }
        return passport_1.default.authenticate('google', {
            session: false,
            failureRedirect: '/login',
        });
    }
    jwtProtect(customHandler) {
        return (req, res, next) => {
            passport_1.default.authenticate('jwt', { session: false }, (err, user, info) => {
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
    // Organization Admin User Registration API
    async register(orgData) {
        // Destructure organization data
        const { name, email, phone, address, organization_name, industry_name, pincode, website, timezone, plan_type, subscription_start_date, subscription_end_date, currencyid, file_storage_limit, data_storage_limit, created_at, updated_at, } = orgData;
        // Check if email already exists in the database
        const existingEmail = await db_1.default.organizations.findFirst({
            where: { email },
        });
        // If email exists, return error
        if (existingEmail) {
            return api_result_1.ApiResult.error("Email is already registered.", 400);
        }
        // Check if phone number already exists in the database
        const existingPhone = await db_1.default.organizations.findFirst({
            where: { phone },
        });
        // If phone exists, return error
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
        const result = await db_1.default.$transaction(async (trx) => {
            // Create a new organization record
            const reg = await trx.organizations.create({
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
                    organization_id: reg.id,
                    email: orgData.email,
                    password_hash: hashedPassword,
                    first_name: orgData.first_name,
                    last_name: orgData.last_name,
                    phone: orgData.phone,
                    user_type: 'ADMIN',
                    job_title: orgData.job_title,
                    created_at: orgData.created_at,
                    updated_at: orgData.updated_at,
                },
            });
            // Return success response with created organization and user info
            return api_result_1.ApiResult.success({
                organization: {
                    id: Number(reg.id),
                    name: reg.name,
                    organization_name: reg.organization_name,
                    industry_name: reg.industry_name,
                },
                user: {
                    id: Number(user.id),
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                },
            }, "Registration successful", 201);
        });
        // Return the final result
        return result;
    }
}
exports.Auth = Auth;
exports.authService = new Auth();
