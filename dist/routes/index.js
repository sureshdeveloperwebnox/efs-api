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
const combineRouters = (app) => {
    const apiRouter = (0, express_1.Router)();
    app.use(passport_1.default.initialize());
    app.use((0, express_session_1.default)({ secret: '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', resave: false, saveUninitialized: false }));
    (0, api_routes_1.attachControllers)(apiRouter, [
        controllers_1.AuthController,
        controllers_1.UserController,
        controllers_1.OrganizationController,
        controllers_1.HelloController
    ], {
        middleware: {
            auth: middlewares_1.createRoleMiddleware,
            validator: middlewares_1.ValidatorMiddleware,
        },
    });
    app.use('/api', apiRouter);
};
exports.combineRouters = combineRouters;
