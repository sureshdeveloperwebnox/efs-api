import { ApiResult } from "../../utils/api-result";
import prisma from "../../config/db";
import bcrypt from "bcrypt";
import _ from "lodash";
import { ICreateOrganization, IEditOrganization, IIDModel } from "../model";
import { stringifyBigInts } from "../../middlewares";
export class Organization {

  // Register a new organization
  public async register(orgData: ICreateOrganization): Promise<ApiResult> {
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
    const result = await prisma.$transaction(async (trx: any) => {
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
  public async getOrganization(data: IIDModel): Promise<ApiResult> {
    try {
      const start = performance.now();

      // Only select required fields instead of entire row (better performance)
      const result = await prisma.organizations.findFirst({
        where: { id: BigInt(data.id) }
      });
  
      if (!result) {
        return ApiResult.success({}, "No data retrieved", 409);
      }
  
      // Convert BigInt values to string (if needed) without deep clone
      const formattedResult = await stringifyBigInts(result);
      const end = performance.now();
      console.log(`API execution time: ${end - start}ms`);
      return ApiResult.success(formattedResult, "Successfully fetched organization");

      
    } catch (error: any) {
      console.error("Error fetching organization:", error.message);
      return ApiResult.error(
        error.message || "Failed to fetch organization",
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
      const result = await prisma.$transaction(async (trx: any) => {
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
  public async deleteOrganization(data: IIDModel): Promise<ApiResult> {
    // Destructure organization_id from request
    const { id } = data;
    try {
      // Perform deletion inside a transaction
      await prisma.$transaction(async (trx: any) => {
        // Delete organization record matching the ID
        return await trx.organizations.delete({
          where: {
            id: BigInt(id),
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
