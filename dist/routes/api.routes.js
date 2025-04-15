"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachControllers = void 0;
require("reflect-metadata");
const decorators_1 = require("../decorators");
const middleware_decorator_1 = require("../decorators/middleware.decorator");
const authenticate_decorator_1 = require("../decorators/authenticate.decorator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const attachControllers = (router, controllers, options) => {
    for (const controller of controllers) {
        const instance = new controller();
        const basePath = Reflect.getMetadata(decorators_1.CONTROLLER_METADATA, controller);
        const prototype = Object.getPrototypeOf(instance);
        const methodNames = Object.getOwnPropertyNames(prototype)
            .filter(prop => prop !== 'constructor' && typeof prototype[prop] === 'function');
        for (const methodName of methodNames) {
            const method = prototype[methodName];
            // Skip methods without @METHOD decorator
            if (!Reflect.hasMetadata(decorators_1.METHOD_METADATA, method))
                continue;
            const httpMethod = Reflect.getMetadata(decorators_1.METHOD_METADATA, method);
            const path = Reflect.getMetadata(decorators_1.PATH_METADATA, method);
            const middlewares = Reflect.getMetadata(decorators_1.MIDDLEWARE_METADATA, method) || [];
            const validationRules = Reflect.getMetadata(middleware_decorator_1.VALIDATE_METADATA, method) || [];
            const authCategories = Reflect.getMetadata(authenticate_decorator_1.AUTHENTICATE_METADATA, method) || [];
            const fullPath = `${basePath}${path}`;
            // 👇 FIXED: Support req, res, next
            const routeHandler = (req, res, next) => {
                Promise.resolve(method.call(instance, req, res, next))
                    .catch((error) => {
                    console.error(`Error in ${methodName}:`, error);
                    res.status(500).json({
                        success: false,
                        message: 'Internal server error',
                        error: error.message,
                    });
                });
            };
            const middlewareStack = [...middlewares];
            if (authCategories.length > 0) {
                middlewareStack.push((0, auth_middleware_1.createRoleMiddleware)(authCategories));
            }
            if (validationRules.length > 0) {
                middlewareStack.push((req, res, next) => {
                    options.middleware.validator(req, res, next, validationRules);
                });
            }
            // ✅ Register route
            router[httpMethod](fullPath, ...middlewareStack, routeHandler);
            // Optional: log route registration
            console.log(`[Route] ${httpMethod.toUpperCase()} ${fullPath}`);
        }
    }
};
exports.attachControllers = attachControllers;
