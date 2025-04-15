"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenGuard = AccessTokenGuard;
exports.RefreshTokenGuard = RefreshTokenGuard;
const verify_token_1 = require("../utils/verify.token");
// Access Token Decorator
function AccessTokenGuard() {
    return function (_target, _propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            const authHeader = req.headers.authorization;
            const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
            // console.log('token auth', token);
            if (!token) {
                return res.status(401).json({ message: 'Access token missing' });
            }
            try {
                // console.log('try', token);
                const decoded = (0, verify_token_1.verifyAccessToken)(token);
                console.log('decoded', decoded);
                req.user = decoded;
                return originalMethod.call(this, req, res, next);
            }
            catch (err) {
                return res.status(403).json({ message: 'Invalid or expired access token' });
            }
        };
    };
}
// Refresh Token Decorator
function RefreshTokenGuard() {
    return function (_target, _propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            const token = req.cookies.refreshToken || req.body.refreshToken;
            if (!token) {
                return res.status(401).json({ message: 'Refresh token missing' });
            }
            try {
                const decoded = (0, verify_token_1.verifyRefreshToken)(token);
                req.user = decoded;
                return originalMethod.call(this, req, res, next);
            }
            catch (err) {
                return res.status(403).json({ message: 'Invalid or expired refresh token' });
            }
        };
    };
}
