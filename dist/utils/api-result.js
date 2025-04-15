"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResult = void 0;
const response_generator_1 = require("./response-generator");
class ApiResult {
    constructor(apiResponse) {
        this.apiResponse = apiResponse;
    }
    static success(data, message = 'Success', statusCode = 200) {
        console.log('data', data);
        const response = response_generator_1.ResponseGenerator.generate(statusCode, data, message);
        return new ApiResult(response);
    }
    static error(message = 'Error', statusCode = 400, data = null, validationErrors = []) {
        const response = response_generator_1.ResponseGenerator.generate(statusCode, data, message, validationErrors);
        return new ApiResult(response);
    }
    send(res) {
        response_generator_1.ResponseGenerator.send(res, this.apiResponse);
    }
}
exports.ApiResult = ApiResult;
