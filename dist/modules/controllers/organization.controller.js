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
exports.OrganizationController = void 0;
const decorators_1 = require("../../decorators");
const rules_1 = require("../rules");
const api_result_1 = require("../../utils/api-result");
const organization_1 = require("../services/organization");
const token_guard_1 = require("../../middlewares/token.guard");
// Organization Controller
let OrganizationController = class OrganizationController {
    constructor() {
        this.organization = new organization_1.Organization();
    }
    // CREATE Organization API endpoint
    async register(req, res) {
        try {
            const result = await this.organization.register(req.body);
            result.send(res);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            api_result_1.ApiResult.error(message, 400).send(res);
        }
    }
    // GET Organization API endpoint
    async getOrganization(req, res) {
        try {
            const id = req.params.id;
            const result = await this.organization.getOrganization({
                id
            });
            result.send(res);
        }
        catch (error) {
            console.log('getOrganization error', error);
            api_result_1.ApiResult.error(error.message || "Internal server error", 500);
        }
    }
    // UPDATE Organization API endpoint
    async updateOrganization(req, res) {
        try {
            const id = req.params.id;
            const body = req.body;
            const data = { ...body, id };
            const result = await this.organization.updateOrganization(data);
            result.send(res);
        }
        catch (error) {
            console.log('updateOrganization error', error);
            api_result_1.ApiResult.error(error.message || "Internal server error", 500);
        }
    }
    // DELETE Organization API endpoint
    async deleteOrganization(req, res) {
        try {
            const id = req.params.id;
            const result = await this.organization.deleteOrganization({
                id,
            });
            result.send(res);
        }
        catch (error) {
            console.log('deleteOrganization error', error);
            api_result_1.ApiResult.error(error.message || "Internal server error", 500);
        }
    }
};
exports.OrganizationController = OrganizationController;
__decorate([
    (0, decorators_1.POST)(""),
    (0, decorators_1.Validate)([rules_1.ValidateParamsID, rules_1.CreateOrganizationValidation]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "register", null);
__decorate([
    (0, decorators_1.GET)("/:id"),
    (0, decorators_1.Validate)([rules_1.ValidateParamsID]),
    (0, token_guard_1.AccessTokenGuard)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getOrganization", null);
__decorate([
    (0, decorators_1.PUT)("/:id"),
    (0, decorators_1.Validate)([rules_1.ValidateParamsID, rules_1.UpdateOrganizationValidation]),
    (0, token_guard_1.AccessTokenGuard)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateOrganization", null);
__decorate([
    (0, decorators_1.DELETE)("/:id"),
    (0, decorators_1.Validate)([rules_1.ValidateParamsID]),
    (0, token_guard_1.AccessTokenGuard)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deleteOrganization", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, decorators_1.Controller)("/organization"),
    __metadata("design:paramtypes", [])
], OrganizationController);
