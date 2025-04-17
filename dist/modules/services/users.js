"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const api_result_1 = require("../../utils/api-result");
const db_1 = __importDefault(require("../../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const middlewares_1 = require("../../middlewares");
// User API Service
class User {
    // User Register API
    async register(userData) {
        const { first_name, last_name, organization_id, isVerified_Email, isVerified_PhoneNumber, email, phone, job_title, user_type, is_active, email_verified, created_at, updated_at, } = userData;
        try {
            // Check if email already exists
            const existingEmail = await db_1.default.users.findFirst({
                where: { email },
            });
            if (existingEmail) {
                return api_result_1.ApiResult.error("Email is already registered.", 400);
            }
            // Check if phone already exists
            const existingPhone = await db_1.default.users.findFirst({
                where: { phone },
            });
            if (existingPhone) {
                return api_result_1.ApiResult.error("Phone number is already registered.", 400);
            }
            //password generation
            const salt = await bcrypt_1.default.genSalt(10);
            const password = Math.floor(Math.random() * 9000 + 1000).toString();
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            const user = await db_1.default.$transaction(async (trx) => {
                return await trx.users.create({
                    data: {
                        first_name,
                        organization_id: Number(organization_id),
                        password_hash: hashedPassword,
                        last_name,
                        isVerified_Email,
                        isVerified_PhoneNumber,
                        email,
                        phone,
                        job_title,
                        user_type: user_type,
                        is_active,
                        email_verified,
                        created_at,
                        updated_at,
                    },
                });
            });
            return api_result_1.ApiResult.success({
                user: {
                    id: Number(user.id),
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                },
            }, "User registration successful");
        }
        catch (error) {
            console.error("User registration error:", error);
            return api_result_1.ApiResult.error("User registration failed", 500);
        }
    }
    // GET User API
    async getUser(data) {
        const { id } = data;
        try {
            const user = await db_1.default.users.findUnique({
                where: {
                    id: BigInt(id),
                },
            });
            if (!user) {
                return api_result_1.ApiResult.error("User not found", 404);
            }
            const result = await (0, middlewares_1.stringifyBigInts)(user);
            return api_result_1.ApiResult.success(result, "Successfully fetched user");
        }
        catch (error) {
            return api_result_1.ApiResult.error("Failed to fetch user data", 500);
        }
    }
    // Update User API
    async updateUser(data) {
        const { id, first_name, last_name, organization_id, isVerified_Email, isVerified_PhoneNumber, email, phone, job_title, user_type, is_active, email_verified, created_at, updated_at, } = data;
        try {
            const result = await db_1.default.$transaction(async (trx) => {
                const org = await trx.users.updateMany({
                    where: {
                        id: Number(id),
                    },
                    data: {
                        first_name,
                        last_name,
                        organization_id: Number(organization_id),
                        isVerified_Email,
                        isVerified_PhoneNumber,
                        email,
                        phone,
                        job_title,
                        user_type,
                        is_active,
                        email_verified,
                        created_at,
                        updated_at,
                    },
                });
                return api_result_1.ApiResult.success({ result: org }, "Successfully updated user");
            });
            return result;
        }
        catch (error) {
            console.log("updateuser error", error);
            return api_result_1.ApiResult.error(error.message || "Failed to update user", 500);
        }
    }
    // Delete User API
    async deleteUser(data) {
        const { id } = data;
        try {
            await db_1.default.$transaction(async (trx) => {
                return await trx.users.delete({
                    where: {
                        id: Number(id),
                    },
                });
            });
            return api_result_1.ApiResult.success({}, "User deleted successful");
        }
        catch (error) {
            return api_result_1.ApiResult.error("Failed to delete user", 500);
        }
    }
    //User Profile API
    async getUserProfiles() {
        try {
            const users = await db_1.default.users.findMany();
            const result = await (0, middlewares_1.stringifyBigInts)(users); // Optional, if you're handling BigInts
            console.log('users', users);
            return api_result_1.ApiResult.success(result, "Successfully fetched all user profiles", 200);
        }
        catch (error) {
            return api_result_1.ApiResult.error("Failed to fetch user profiles", 500);
        }
    }
}
exports.User = User;
