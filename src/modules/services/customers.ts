import { stringifyBigInts } from "../../middlewares";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { ICreateCustomer, IIDModel, IUpdateCustomer } from "../model";

// Customer API Service
export class Customers {
    
  // Create Customer API Service
  public async createCustomer(data: ICreateCustomer): Promise<ApiResult> {
    const {
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
      const checkCustomer = await prisma.users.findFirst({
        where: {
          email,
        },
      });

      if (!checkCustomer) {
        return ApiResult.error("Customer email already exist", 202);
      }
      await prisma.$transaction(async (trx) => {
        return await trx.customers.createMany({
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
          },
        });
      });
      return ApiResult.success({}, "Customer created successful", 201);
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
