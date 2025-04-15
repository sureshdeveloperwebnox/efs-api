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
let UserController = class UserController {
    constructor() {
        this.user = new users_1.User();
    }
    async registration(req, res) {
        try {
            const result = await this.user.registration(req.body);
            result.send(res);
        }
        catch (error) {
            api_result_1.ApiResult.error(error.message, 400).send(res);
        }
    }
    async listAllUser(req, res) {
        try {
            const id = req.params.id;
            const result = await this.user.listAllUser({ id: id });
            result.send(res);
        }
        catch (error) {
            api_result_1.ApiResult.error(error.message, 400).send(res);
        }
    }
    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const body = req.body;
            const data = { ...body, id };
            const result = await this.user.updateUser(data);
            result.send(res);
        }
        catch (error) {
            api_result_1.ApiResult.error(error.message, 400).send(res);
        }
    }
    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const body = req.body;
            const data = { ...body, id };
            const result = await this.user.deleteUser(data);
            result.send(res);
        }
        catch (error) {
            api_result_1.ApiResult.error(error.message, 400).send(res);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, decorators_1.POST)("/registration"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registration", null);
__decorate([
    (0, decorators_1.GET)("/listAllUser/:id"),
    (0, token_guard_1.AccessTokenGuard)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "listAllUser", null);
__decorate([
    (0, decorators_1.PUT)("/updateUser/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, decorators_1.DELETE)("/deleteUser/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, decorators_1.Controller)("/user"),
    __metadata("design:paramtypes", [])
], UserController);
