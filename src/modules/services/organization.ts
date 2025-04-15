// Import ApiResult utility for handling API responses
import { ApiResult } from "../../utils/api-result";

// Import Prisma client for database operations
import prisma from "../../config/db";

// Import interfaces for organization model
import { IEditOrganization, IOrganization } from "../model/organization.model";

// Import bcrypt for password hashing
import bcrypt from "bcrypt";

// Import lodash library for utility functions
import _ from "lodash";

// Organization class handling all CRUD operations
export class Organization {
  // Register a new organization
  public async register(orgData: IOrganization): Promise<ApiResult> {
    // Destructure organization data
    const {
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
    } = orgData;

    // Check if email already exists in the database
    const existingEmail = await prisma.organizations.findFirst({
      where: { email },
    });

    // If email exists, return error
    if (existingEmail) {
      return ApiResult.error("Email is already registered.", 400);
    }

    // Check if phone number already exists in the database
    const existingPhone = await prisma.organizations.findFirst({
      where: { phone },
    });

    // If phone exists, return error
    if (existingPhone) {
      return ApiResult.error("Phone number is already registered.", 400);
    }

    // Generate salt for hashing password
    const salt = await bcrypt.genSalt(10);

    // Generate a random 4-digit password
    const password = Math.floor(Math.random() * 9000 + 1000).toString();

    // Hash the generated password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Perform database operations in a transaction
    const result = await prisma.$transaction(async (trx) => {
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
      return ApiResult.success(
        {
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
        },
        "Registration successful",
        201
      );
    });

    // Return the final result
    return result;
  }

  // Get organization details by ID
  public async getOrganization(data: {
    organization_id: string;
  }): Promise<ApiResult> {
    // Destructure organization_id from request
    const { organization_id } = data;
    try {
      // Find organizations matching the given ID
      const result = await prisma.organizations.findMany({
        where: {
          id: BigInt(organization_id),
        },
      });

      // Map and format the results
      const mapResult = result.map((organization: any) => ({
        ...organization,
        id: Number(organization.id),
        file_storage_limit: Number(organization.file_storage_limit),
        data_storage_limit: Number(organization?.data_storage_limit),
        currencyid: Number(organization?.currencyid),
      }));

      // If no data found, return success with no data
      if (_.isEmpty(mapResult)) {
        return ApiResult.success({}, "No data retrieved", 409);
      }

      // Return success with fetched data
      return ApiResult.success(
        mapResult,
        "Successfully fetched all organizations"
      );
    } catch (error: any) {
      // Log error to console
      console.error("Error fetching organizations:", error.message);

      // Return error response
      return ApiResult.error(
        error.message || "Failed to fetch organizations",
        500
      );
    }
  }

  // Update organization details by ID
  public async updateOrganization(data: IEditOrganization): Promise<ApiResult> {
    // Destructure organization data
    const {
      id,
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
    } = data;

    try {
      // Perform update in a transaction
      const result = await prisma.$transaction(async (trx) => {
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
        return ApiResult.success({}, "Successfully updated organization", 202);
      });

      // Return the result of transaction
      return result;
    } catch (error: any) {
      // Log error to console
      console.log("updateOrganization error", error);

      // Return error response
      return ApiResult.error(
        error.message || "Failed to update organization",
        500
      );
    }
  }

  // Delete organization by ID
  public async deleteOrganization(data: {
    organization_id: string;
  }): Promise<ApiResult> {
    // Destructure organization_id from request
    const { organization_id } = data;
    try {
      // Perform deletion inside a transaction
      await prisma.$transaction(async (trx) => {
        // Delete organization record matching the ID
        return await trx.organizations.delete({
          where: {
            id: BigInt(organization_id),
          },
        });
      });

      // Return success response after deletion
      return ApiResult.success({}, "Successfully organization deleted", 202);
    } catch (error: any) {
      // Return error response if deletion fails
      return ApiResult.error(
        error.message || "Failed to delete organization",
        500
      );
    }
  }
}
