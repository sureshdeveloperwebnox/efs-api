"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorMiddleware = void 0;
const response_generator_1 = require("../utils/response-generator");
const ValidatorMiddleware = (req, res, next, rules = []) => {
    const validationErrors = [];
    for (const rule of rules) {
        if (rule.body) {
            const { error, value } = rule.body.validate(req.body, { abortEarly: false });
            if (error) {
                validationErrors.push(...error.details.map((d) => ({
                    field: d.path.join('.'),
                    message: d.message,
                })));
            }
            else {
                req.body = value;
            }
        }
        if (rule.params) {
            const { error } = rule.params.validate(req.params, { abortEarly: false });
            if (error) {
                validationErrors.push(...error.details.map((d) => ({
                    field: d.path.join('.'),
                    message: d.message,
                })));
            }
        }
        if (rule.query) {
            const { error } = rule.query.validate(req.query, { abortEarly: false });
            if (error) {
                validationErrors.push(...error.details.map((d) => ({
                    field: d.path.join('.'),
                    message: d.message,
                })));
            }
        }
        if (rule.headers) {
            const { error } = rule.headers.validate(req.headers, { abortEarly: false });
            if (error) {
                validationErrors.push(...error.details.map((d) => ({
                    field: d.path.join('.'),
                    message: d.message,
                })));
            }
        }
    }
    if (validationErrors.length > 0) {
        return response_generator_1.ResponseGenerator.send(res, response_generator_1.ResponseGenerator.error('Validation error', 400, validationErrors));
    }
    req.validatedData = {
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
    };
    next();
};
exports.ValidatorMiddleware = ValidatorMiddleware;
