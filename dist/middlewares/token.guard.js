"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenGuard = AccessTokenGuard;
exports.RefreshTokenGuard = RefreshTokenGuard;
const verify_token_1 = require("../utils/verify.token");
const api_result_1 = require("../utils/api-result");
// Access Token Decorator
function AccessTokenGuard() {
    return function (_target, _propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (req, res, next) {
            const authHeader = req.headers.authorization;
            console.log("Authorization header:", authHeader ?
                authHeader.substring(0, 15) + "..." : "none");
            if (!authHeader) {
                console.log("No authorization header found");
                return res.status(401).json(api_result_1.ApiResult.error('Access token missing', 401));
            }
            // Bearer token format check
            if (!authHeader.startsWith('Bearer ')) {
                console.log("Authorization header doesn't start with 'Bearer '");
                return res.status(401).json(api_result_1.ApiResult.error('Invalid token format', 401));
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                console.log("No token found in authorization header");
                return res.status(401).json(api_result_1.ApiResult.error('Access token missing', 401));
            }
            console.log("Token extracted:", token.substring(0, 10) + "...");
            try {
                const decoded = await (0, verify_token_1.verifyAccessToken)(token);
                console.log("Token verified successfully:", decoded.provider);
                // Set the user on the request object
                req.user = decoded;
                // Call the original method
                return originalMethod.apply(this, [req, res, next]);
            }
            catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Invalid or expired access token';
                console.log("Token verification failed:", errorMessage);
                return res.status(403).json(api_result_1.ApiResult.error(errorMessage + ' ' + 'or expired access token', 403));
            }
        };
        return descriptor;
    };
}
// Refresh Token Decorator
function RefreshTokenGuard() {
    return function (_target, _propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            const token = req.cookies.refreshToken || req.body.refreshToken;
            if (!token) {
                console.log("No refresh token found");
                return res.status(401).json(api_result_1.ApiResult.error('Refresh token missing', 401));
            }
            try {
                const decoded = (0, verify_token_1.verifyRefreshToken)(token);
                console.log("Refresh token verified successfully");
                req.user = decoded;
                return originalMethod.apply(this, [req, res, next]);
            }
            catch (err) {
                console.log("Refresh token verification failed");
                return res.status(401).json(api_result_1.ApiResult.error('Invalid or expired refresh token', 401));
            }
        };
        return descriptor;
    };
}
