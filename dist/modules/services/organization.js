"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
// Import ApiResult utility for handling API responses
const api_result_1 = require("../../utils/api-result");
// Import Prisma client for database operations
const db_1 = __importDefault(require("../../config/db"));
// Import bcrypt for password hashing
const bcrypt_1 = __importDefault(require("bcrypt"));
// Import lodash library for utility functions
const lodash_1 = __importDefault(require("lodash"));
// Organization class handling all CRUD operations
class Organization {
    // Register a new organization
    async register(orgData) {
        // Destructure organization data
        const { name, email, phone, address, organization_name, industry_name, pincode, website, timezone, plan_type, subscription_start_date, subscription_end_date, currencyid, file_storage_limit, data_storage_limit, created_at, updated_at, } = orgData;
        // Check if email already exists in the database
        const existingEmail = await db_1.default.organizations.findFirst({
            where: { email },
        });
        // If email exists, return error
        if (existingEmail) {
            return api_result_1.ApiResult.error("Email is already registered.", 400);
        }
        // Check if phone number already exists in the database
        const existingPhone = await db_1.default.organizations.findFirst({
            where: { phone },
        });
        // If phone exists, return error
        if (existingPhone) {
            return api_result_1.ApiResult.error("Phone number is already registered.", 400);
        }
        // Generate salt for hashing password
        const salt = await bcrypt_1.default.genSalt(10);
        // Generate a random 4-digit password
        const password = Math.floor(Math.random() * 9000 + 1000).toString();
        // Hash the generated password
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        // Perform database operations in a transaction
        const result = await db_1.default.$transaction(async (trx) => {
            // Create a new organization record
            const reg = await trx.organizations.create({
                data: {
                    name,
                    email,
                    phone,
                    address,
                    organization_name,
                    industry_name,
                    pincode,
                    plan_type,
                    website,
                    timezone,
                    subscription_start_date,
                    subscription_end_date,
                    currencyid,
                    file_storage_limit,
                    data_storage_limit,
                    created_at,
                    updated_at,
                },
            });
            // Create a new user record linked to the organization
            const user = await trx.users.create({
                data: {
                    organization_id: reg.id,
                    email: orgData.email,
                    password_hash: hashedPassword,
                    first_name: orgData.first_name,
                    last_name: orgData.last_name,
                    phone: orgData.phone,
                    job_title: orgData.job_title,
                    created_at: orgData.created_at,
                    updated_at: orgData.updated_at,
                },
            });
            // Return success response with created organization and user info
            return api_result_1.ApiResult.success({
                organization: {
                    id: Number(reg.id),
                    name: reg.name,
                    organization_name: reg.organization_name,
                    industry_name: reg.industry_name,
                },
                user: {
                    id: Number(user.id),
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                },
            }, "Registration successful", 201);
        });
        // Return the final result
        return result;
    }
    // Get organization details by ID
    async getOrganization(data) {
        // Destructure organization_id from request
        const { organization_id } = data;
        try {
            // Find organizations matching the given ID
            const result = await db_1.default.organizations.findMany({
                where: {
                    id: BigInt(organization_id),
                },
            });
            // Map and format the results
            const mapResult = result.map((organization) => ({
                ...organization,
                id: Number(organization.id),
                file_storage_limit: Number(organization.file_storage_limit),
                data_storage_limit: Number(organization === null || organization === void 0 ? void 0 : organization.data_storage_limit),
                currencyid: Number(organization === null || organization === void 0 ? void 0 : organization.currencyid),
            }));
            // If no data found, return success with no data
            if (lodash_1.default.isEmpty(mapResult)) {
                return api_result_1.ApiResult.success({}, "No data retrieved", 409);
            }
            // Return success with fetched data
            return api_result_1.ApiResult.success(mapResult, "Successfully fetched all organizations");
        }
        catch (error) {
            // Log error to console
            console.error("Error fetching organizations:", error.message);
            // Return error response
            return api_result_1.ApiResult.error(error.message || "Failed to fetch organizations", 500);
        }
    }
    // Update organization details by ID
    async updateOrganization(data) {
        // Destructure organization data
        const { id, name, email, phone, address, organization_name, industry_name, pincode, website, timezone, plan_type, subscription_start_date, subscription_end_date, currencyid, file_storage_limit, data_storage_limit, created_at, updated_at, } = data;
        try {
            // Perform update in a transaction
            const result = await db_1.default.$transaction(async (trx) => {
                // Update organization record matching the ID
                const org = await trx.organizations.updateMany({
                    where: {
                        id: BigInt(id),
                    },
                    data: {
                        name,
                        email,
                        phone,
                        address,
                        organization_name,
                        industry_name,
                        pincode,
                        website,
                        timezone,
                        plan_type,
                        subscription_start_date,
                        subscription_end_date,
                        currencyid,
                        file_storage_limit,
                        data_storage_limit,
                        created_at,
                        updated_at,
                    },
                });
                // Return success after update
                return api_result_1.ApiResult.success({}, "Successfully updated organization", 202);
            });
            // Return the result of transaction
            return result;
        }
        catch (error) {
            // Log error to console
            console.log("updateOrganization error", error);
            // Return error response
            return api_result_1.ApiResult.error(error.message || "Failed to update organization", 500);
        }
    }
    // Delete organization by ID
    async deleteOrganization(data) {
        // Destructure organization_id from request
        const { organization_id } = data;
        try {
            // Perform deletion inside a transaction
            await db_1.default.$transaction(async (trx) => {
                // Delete organization record matching the ID
                return await trx.organizations.delete({
                    where: {
                        id: BigInt(organization_id),
                    },
                });
            });
            // Return success response after deletion
            return api_result_1.ApiResult.success({}, "Successfully organization deleted", 202);
        }
        catch (error) {
            // Return error response if deletion fails
            return api_result_1.ApiResult.error(error.message || "Failed to delete organization", 500);
        }
    }
}
exports.Organization = Organization;
