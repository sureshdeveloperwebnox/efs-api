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
const middlewares_1 = require("../../middlewares");
// Auth Cotroller
let AuthController = class AuthController {
    constructor() {
        this.auth = new auth_1.Auth();
    }
    // POST Organization User Register API
    async register(req, res) {
        try {
            const result = await this.auth.register(req.body);
            result.send(res);
        }
        catch (error) {
            console.log('register error', error);
            api_result_1.ApiResult.error(error.message || "Internal server error", 400);
        }
    }
    // GET Google User Registration API
    initiateGoogleAuth(req, res, next) {
        const state = typeof req.query.redirectUrl === "string"
            ? req.query.redirectUrl
            : undefined;
        return passport_1.default.authenticate("google", {
            scope: ["profile", "email"],
            state: state,
            accessType: 'offline', // Add this to request refresh token
            prompt: 'consent' //
        })(req, res, next);
    }
    // Get Google User Regisration Callback API
    handleGoogleCallback(req, res, next) {
        passport_1.default.authenticate("google", {
            failureRedirect: "/login",
            session: false,
        }, async (err, user, info) => {
            try {
                if (err) {
                    console.error("🚨 Passport Error:", err);
                    throw err;
                }
                if (!user) {
                    console.error("🚫 No user returned from Google Strategy. Info:", info);
                    throw new Error("Authentication failed: No user returned");
                }
                console.log("✅ Authenticated User:", user);
                const stringifydata = await (0, middlewares_1.stringifyBigInts)(user);
                const result = await this.auth.handleGoogleAuthSuccess(stringifydata);
                result.send(res);
            }
            catch (error) {
                console.error("🔥 Google login failed:", error);
                api_result_1.ApiResult.error("Google login failed", 500).send(res);
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
    //GET Me User Info API
    async me(req, res) {
        try {
            const result = await this.auth.me(req.body);
            result.send(res);
        }
        catch (error) {
            console.log('me error', error);
            api_result_1.ApiResult.error(error.message || "Internal server error", 400);
        }
    }
    //POST Refresh Token Generation API
    async refreshToken(req, res) {
        var _a;
        try {
            // Get refresh token from cookie or request body
            const refreshToken = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken) || req.body.refreshToken;
            if (!refreshToken) {
                api_result_1.ApiResult.error('Refresh token is required', 401).send(res);
                return;
            }
            const result = await this.auth.refreshAccessToken(refreshToken);
            result.send(res);
        }
        catch (error) {
            console.error("🔄 Token refresh failed:", error);
            api_result_1.ApiResult.error(error.message || 'Token refresh failed', 401).send(res);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, decorators_1.POST)('/register'),
    (0, decorators_1.Validate)([rules_1.OrganizationUserRegisterValidation]) // Organization Admin User Validation Schema
    ,
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
    __metadata("design:returntype", void 0)
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
    (0, decorators_1.POST)("/refresh-token"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, decorators_1.Controller)("/auth"),
    __metadata("design:paramtypes", [])
], AuthController);
