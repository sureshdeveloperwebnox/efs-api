"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineRouters = void 0;
const express_1 = require("express");
const api_routes_1 = require("./api.routes");
const controllers_1 = require("../modules/controllers");
const middlewares_1 = require("../middlewares");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const env_config_1 = __importDefault(require("../config/env.config"));
const combineRouters = (app) => {
    const apiRouter = (0, express_1.Router)();
    app.use(passport_1.default.initialize());
    app.use((0, express_session_1.default)({ secret: env_config_1.default.GOOGLE_CLIENT_SECRET, resave: false, saveUninitialized: false }));
    (0, api_routes_1.attachControllers)(apiRouter, [
        controllers_1.AuthController,
        controllers_1.UserController,
        controllers_1.OrganizationController,
        controllers_1.SkillController,
        controllers_1.HelloController,
        controllers_1.BusinessHoursController,
        controllers_1.UserSkillController,
        controllers_1.HolidaysController,
        controllers_1.TimeOffRequestController,
        controllers_1.CrewController,
        controllers_1.CrewMemberController,
        controllers_1.EquipmentController
    ], {
        middleware: {
            auth: middlewares_1.createRoleMiddleware,
            validator: middlewares_1.ValidatorMiddleware,
        },
    });
    app.use('/api', apiRouter);
};
exports.combineRouters = combineRouters;
