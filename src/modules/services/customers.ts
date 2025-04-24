import { stringifyBigInts } from "../../middlewares";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import {
  ICreateCustomer,
  IDateTime,
  IIDModel,
  IUpdateCustomer,
} from "../model";
import { generateHashPassword } from "../../utils";

// Customer API Service
export class Customers {
  // Create Customer API Service
  public async createCustomer(data: ICreateCustomer): Promise<ApiResult> {
  
    const {
      organization_id,
      company_id,
      first_name,
      last_name,
      job_title,
      email,
      phone,
      address,
      is_active,
      isVerified_Email,
      isVerified_PhoneNumber,
      email_verified,
      date_time
    } = data;
  
    try {
      // Check if customer email already exists
      const checkCustomer = await prisma.users.findFirst({
        where: { email },
      });
  
      if (checkCustomer) {
        return ApiResult.error("Customer email already exists", 202);
      }
  
      // Generate password only after email is confirmed unique
      const { hashedPassword } = await generateHashPassword();
  
      await prisma.$transaction(async (trx) => {
        const user = await trx.users.create({
          data: {
            first_name,
            last_name,
            organization_id,
            password_hash: hashedPassword,
            isVerified_Email,
            isVerified_PhoneNumber,
            email,
            phone,
            job_title,
            user_type: "CUSTOMER",
            is_active,
            email_verified,
            created_at: date_time
          },
        });
  
        await trx.customers.create({
          data: {
            organization_id,
            user_id: user.id,
            company_id,
            first_name,
            last_name,
            email,
            phone,
            address,
            is_active,
          },
        });
      });
  
      return ApiResult.success({}, "Customer created successfully", 201);
    } catch (error: any) {
      console.log("CreateCustomer Error", error);
      return ApiResult.error("Failed to create customer", 500);
    }
  }
  

  // Get Customer details by ID API Service
  public async getCustomerByID(data: IIDModel): Promise<ApiResult> {
    try {
      // Only select required fields instead of entire row (better performance)
      const result = await prisma.customers.findFirst({
        where: { id: BigInt(data.id) },
      });

      if (!result) {
        return ApiResult.success({}, "No data retrieved", 409);
      }

      // Convert BigInt values to string (if needed) without deep clone
      const formattedResult = await stringifyBigInts(result);
      return ApiResult.success(
        formattedResult,
        "Successfully fetched customers"
      );
    } catch (error: any) {
      console.error("getCustomerByID Error:", error.message);
      return ApiResult.error(error.message || "Failed to fetch customers", 500);
    }
  }

  // Update Customer API Service
  public async updateCustomer(data: IUpdateCustomer): Promise<ApiResult> {
    const {
      id,
      organization_id,
      company_id,
      first_name,
      last_name,
      email,
      phone,
      address,
      is_active,
      created_at,
    } = data;

    try {
      await prisma.$transaction(async (trx) => {
        return await trx.customers.updateMany({
          where: {
            id,
          },
          data: {
            organization_id,
            company_id,
            first_name,
            last_name,
            email,
            phone,
            address,
            is_active,
            created_at,
            updated_at: created_at,
          },
        });
      });
      return ApiResult.success("Customer updated successful");
    } catch (error: any) {
      console.log("updateCustomer service Error", error);
      return ApiResult.error("Failed to update customer", 500);
    }
  }
}
