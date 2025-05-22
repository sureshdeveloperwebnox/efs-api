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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const decorators_1 = require("../../decorators");
const api_result_1 = require("../../utils/api-result");
const users_1 = require("../services/users");
const token_guard_1 = require("../../middlewares/token.guard");
const rules_1 = require("../rules");
// User Controller
let UserController = class UserController {
    constructor() {
        this.user = new users_1.User();
    }
    // User Registration API 
    async register(req, res) {
        try {
            const result = await this.user.register(req.body);
            result.send(res);
        }
        catch (error) {
            console.log('register error', error);
            api_result_1.ApiResult.error(error.message || "Internal server error", 500);
        }
    }
    // Get User API
    async getUser(req, res) {
        try {
            const id = req.params.id;
            const result = await this.user.getUser({ id: id });
            result.send(res);
        }
        catch (error) {
            console.log('getUser error', error);
            api_result_1.ApiResult.error(error.message || "Internal server error", 500);
        }
    }
    // Update User API
    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const body = req.body;
            const data = { ...body, id };
            const result = await this.user.updateUser(data);
            result.send(res);
        }
        catch (error) {
            console.log('updateUser error', error);
            api_result_1.ApiResult.error(error.message || "Internal server error", 500);
        }
    }
    // DELETE User API
    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const body = req.body;
            const data = { ...body, id };
            const result = await this.user.deleteUser(data);
            result.send(res);
        }
        catch (error) {
            console.log('deleteUser error', error);
            api_result_1.ApiResult.error(error.message || "Internal server error", 500);
        }
    }
    async getUserProfiles(req, res) {
        try {
            const result = await this.user.getUserProfiles();
            result.send(res);
        }
        catch (error) {
            console.log('getUserProfiles error', error);
            api_result_1.ApiResult.error(error.message || "Internal server error", 500);
        }
    }
    async getAllUser(req, res, data) {
        try {
            const result = await this.user.getAllUser(data);
            result.send(res);
        }
        catch (error) {
            console.log('getAllUser error', error);
            api_result_1.ApiResult.error(error.message || "Internal server error", 500);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, decorators_1.POST)(''),
    (0, decorators_1.Validate)([rules_1.userRegisterValidationSchema]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, decorators_1.GET)("/:id"),
    (0, decorators_1.Validate)([rules_1.ValidateParamsID]),
    (0, token_guard_1.AccessTokenGuard)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, decorators_1.PUT)("/:id"),
    (0, decorators_1.Validate)([rules_1.ValidateParamsID, rules_1.userUpdationValidationSchema]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, decorators_1.DELETE)("/:id"),
    (0, decorators_1.Validate)([rules_1.ValidateParamsID]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, decorators_1.GET)('/user-profiles'),
    (0, token_guard_1.AccessTokenGuard)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfiles", null);
__decorate([
    (0, decorators_1.POST)('/getAllUser'),
    (0, token_guard_1.AccessTokenGuard)(),
    (0, decorators_1.GETALLPayloadDecorator)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
exports.UserController = UserController = __decorate([
    (0, decorators_1.Controller)('/user'),
    __metadata("design:paramtypes", [])
], UserController);
