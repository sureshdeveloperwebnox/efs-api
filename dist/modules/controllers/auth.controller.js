"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const decorators_1 = require("../../decorators");
const rules_1 = require("../rules");
const auth_1 = require("../services/auth");
const api_result_1 = require("../../utils/api-result");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const env_config_1 = __importDefault(require("../../config/env.config"));
// Google OAuth Strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_config_1.default.GOOGLE_CLIENT_ID,
    clientSecret: env_config_1.default.GOOGLE_CLIENT_SECRET,
    callbackURL: env_config_1.default.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
    proxy: true
}, async (request, accessToken, refreshToken, profile, done) => {
    var _a, _b, _c, _d, _e, _f;
    try {
        // Here you would typically find or create a user in your database
        const user = {
            googleId: profile.id,
            email: (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value,
            firstName: (_c = profile.name) === null || _c === void 0 ? void 0 : _c.givenName,
            lastName: (_d = profile.name) === null || _d === void 0 ? void 0 : _d.familyName,
            avatar: (_f = (_e = profile.photos) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.value
        };
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
let AuthController = class AuthController {
    constructor() {
        this.auth = new auth_1.Auth();
    }
    handleError(error, res, defaultMessage = "Internal server error", statusCode = 500) {
        console.error(error);
        const message = error.message || defaultMessage;
        const status = error.statusCode || statusCode;
        api_result_1.ApiResult.error(message, status).send(res);
    }
    async register(req, res) {
        try {
            const result = await this.auth.register(req.body);
            result.send(res);
        }
        catch (error) {
            this.handleError(error, res, "Registration failed", 400);
        }
    }
    initiateGoogleAuth(req, res, next) {
        const state = req.query.redirectUrl
            ? Buffer.from(JSON.stringify({ redirectUrl: req.query.redirectUrl })).toString('base64')
            : undefined;
        const authenticator = passport_1.default.authenticate("google", {
            scope: ["profile", "email"],
            state,
            // prompt: 'consent',       
            session: false
        });
        authenticator(req, res, next);
    }
    async handleGoogleCallback(req, res, next) {
        passport_1.default.authenticate("google", { session: false }, async (err, user, info) => {
            try {
                if (err || !user) {
                    console.error("Google auth failed:", err || info);
                    return res.redirect(`${env_config_1.default.FRONTEND_LOGIN_URL}?error=authentication_failed`);
                }
                // Process user registration/login
                const tokens = await this.auth.handleGoogleUser(user);
                console.log("tokens", tokens);
                // Set secure cookies
                res.cookie('accessToken', tokens === null || tokens === void 0 ? void 0 : tokens.accessToken, {
                    path: '/',
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                });
                res.cookie('refreshToken', tokens === null || tokens === void 0 ? void 0 : tokens.refreshToken, {
                    path: '/',
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                });
                // Handle redirect
                const state = req.query.state ? JSON.parse(Buffer.from(req.query.state, 'base64').toString()) : {};
                const redirectUrl = env_config_1.default.FRONTEND_DASHBOARD_URL;
                return res.redirect(redirectUrl);
            }
            catch (error) {
                console.error("Google callback error:", error);
                return res.redirect(`${env_config_1.default.FRONTEND_LOGIN_URL}?error=server_error`);
            }
        })(req, res, next);
    }
    // POST User Login API
    async login(req, res) {
        try {
            const result = await this.auth.login(req.body);
            result.send(res);
        }
        catch (error) {
            console.log('login error', error);
            api_result_1.ApiResult.error(error.message || "Internal server error", 400);
        }
    }
    async me(req, res) {
        try {
            const result = await this.auth.me(req.user); // Assuming req.user is set by auth middleware
            result.send(res);
        }
        catch (error) {
            this.handleError(error, res, "Failed to fetch user data", 401);
        }
    }
    async authRegister(req, res) {
        try {
            const result = await this.auth.authRegister(req.body);
            result.send(res);
        }
        catch (error) {
            this.handleError(error, res, 'Registration failed', 400);
        }
    }
    async organizationRegister(req, res) {
        try {
            const result = await this.auth.organizationRegister(req.body);
            result.send(res);
        }
        catch (error) {
            this.handleError(error, res, "Organization registration failed", 400);
        }
    }
    async verifyAccessToken(req, res) {
        var _a, _b;
        try {
            const accessToken = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1]);
            if (!accessToken) {
                return api_result_1.ApiResult.error('Access token is required', 401).send(res);
            }
            const result = await this.auth.verifyAccessToken(accessToken);
            result.send(res);
        }
        catch (error) {
            this.handleError(error, res, 'Token verification failed', 401);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, decorators_1.POST)('/register'),
    (0, decorators_1.Validate)([rules_1.OrganizationUserRegisterValidation]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, decorators_1.GET)("/google"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "initiateGoogleAuth", null);
__decorate([
    (0, decorators_1.GET)("/google/callback"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleGoogleCallback", null);
__decorate([
    (0, decorators_1.POST)("/login"),
    (0, decorators_1.Validate)([rules_1.Login]) // Validation Schema
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, decorators_1.GET)('/me'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, decorators_1.POST)("/authRegister"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authRegister", null);
__decorate([
    (0, decorators_1.POST)('/organizationRegister'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "organizationRegister", null);
__decorate([
    (0, decorators_1.POST)("/verify-access-token"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyAccessToken", null);
exports.AuthController = AuthController = __decorate([
    (0, decorators_1.Controller)("/auth"),
    __metadata("design:paramtypes", [])
], AuthController);
