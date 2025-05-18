import { stringifyBigInts } from "../../middlewares";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import {
  ICreateCustomer,
  IDateTime,
  IIDModel,
  IUpdateCustomer,
} from "../model";
import { generateHashPassword, getHashPassword } from "../../utils";

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
      password,
      address,
      date_time,
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
      const { hashedPassword } = await getHashPassword(password);

      await prisma.$transaction(async (trx) => {
        const user = await trx.users.create({
          data: {
            first_name,
            last_name,
            organization_id,
            password_hash: hashedPassword,
            email,
            phone,
            job_title,
            user_type: "CUSTOMER",
            created_at: date_time,
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
            is_active: 1,
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
        include: {
          users: {
            select: {
              id: true,
              job_title: true,
              user_type: true,
            },
          },
          companies: {
            select: {
              name: true,
              email: true,
              phone: true,
              website: true,
            },
          },
          organizations: {
            select: {
              name: true,
              email: true,
              phone: true,
              website: true,
            },
          },
        },
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
      user_id,
      organization_id,
      company_id,
      first_name,
      last_name,
      email,
      phone,
      address,
      job_title,
      date_time,
    } = data;

    try {
      await prisma.$transaction(async (trx) => {
        await trx.users.update({
          data: {
            job_title,
            updated_at: date_time,
          },

          where: {
            id: user_id,
          },
        });

        await trx.customers.update({
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
            updated_at: date_time,
          },
        });
      });
      return ApiResult.success({}, "Customer updated successful", 202);
    } catch (error: any) {
      console.log("updateCustomer service Error", error);
      return ApiResult.error("Failed to update customer", 500);
    }
  }

  // Get All Customer API Service
  public async getAllCustomer(data: any): Promise<ApiResult> {
    const { organization_id } = data;
    try {
      // Only select required fields instead of entire row (better performance)
      const result = await prisma.customers.findMany({
        where: {
          organization_id: organization_id
        },
        include: {
          users: {
            select: {
              id: true,
              job_title: true,
              user_type: true,
            },
          },
          companies: {
            select: {
              name: true,
            },
          },
          organizations: {
            select: {
              name: true,
            },
          },
        },
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
      console.error("getAllCustomer Error:", error.message);
      return ApiResult.error(error.message || "Failed to fetch customers", 500);
    }
  }

  // Update Customer Status Change

  public async updateCustomerStatusChange(data: any): Promise<ApiResult> {
    const { id, status, date_time } = data;

    try {
      await prisma.$transaction(async (trx) => {
        await trx.customers.update({
          where: {
            id,
          },
          data: {
            is_active: status,
            updated_at: date_time,
          },
        });
      });
      return ApiResult.success({}, `Customer is ${(status === 1) ? 'Activated' : 'Deactivated' }`, 202);
    } catch (error: any) {
      console.log("updateCustomerStatusChange service Error", error);
      return ApiResult.error("Failed to update customer status change", 500);
    }
  }

public async getAllCustomerByID(data?: any): Promise<ApiResult> {
  const { company_id, organization_id } = data || {};

  try {
    // Return nothing if neither ID is provided
    if (!company_id && !organization_id) {
      return ApiResult.success({}, "No data retrieved", 200);
    }

    // Build where clause based on provided IDs
    const whereClause: any = {};
    if (company_id) {
      whereClause.company_id = company_id;
    }
    if (organization_id) {
      whereClause.organization_id = organization_id;
    }

    const result = await prisma.customers.findMany({
      where: whereClause,
      include: {
        users: {
          select: {
            id: true,
            job_title: true,
            user_type: true,
          },
        },
        companies: {
          select: {
            name: true,
          },
        },
        organizations: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!result || result.length === 0) {
      return ApiResult.success({}, "No data retrieved", 409);
    }

    const formattedResult = await stringifyBigInts(result);
    return ApiResult.success(formattedResult, "Successfully fetched customers");
  } catch (error: any) {
    console.error("getAllCustomer Error:", error.message);
    return ApiResult.error(error.message || "Failed to fetch customers", 500);
  }
}



}
