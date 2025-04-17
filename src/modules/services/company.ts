import { stringifyBigInts } from "../../middlewares";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { ICreateCompany, IUpdateCompany, IIDModel } from "../model";

export class Company {

  // Create Company API
  public async createCompany(data: ICreateCompany): Promise<ApiResult> {
    const {
      organization_id,
      name,
      industry,
      tax_id,
      address,
      phone,
      email,
      website,
      created_at,
    } = data;
    try {

      // Check Company name exist
      const checkCompanyName = await prisma.companies.findFirst({
        where: {
          name,
        },
      });

      if (checkCompanyName) {
        return ApiResult.error("Company name exist", 202);
      }
      await prisma.$transaction(async (trx) => {
        return await trx.companies.createMany({
          data: {
            organization_id,
            name,
            industry,
            tax_id,
            address,
            phone,
            email,
            website,
            created_at,
          },
        });
      });
      return ApiResult.success({}, "Company created successful", 201);
    } catch (error: any) {
      return ApiResult.error("", 500);
    }
  };

  // Get Company details by ID API Service
  public async getCompanyByID(data: IIDModel): Promise<ApiResult> {
    try {
      const start = performance.now();

      // Only select required fields instead of entire row (better performance)
      const result = await prisma.companies.findFirst({
        where: { id: BigInt(data.id) },
      });

      if (!result) {
        return ApiResult.success({}, "No data retrieved", 409);
      }

      // Convert BigInt values to string (if needed) without deep clone
      const formattedResult = await stringifyBigInts(result);
      const end = performance.now();
      console.log(`API execution time: ${end - start}ms`);
      return ApiResult.success(
        formattedResult,
        "Successfully fetched companies"
      );
    } catch (error: any) {
      console.error("getCompanyByID Error:", error.message);
      return ApiResult.error(error.message || "Failed to fetch companies", 500);
    }
  };

  // Update Company API Service
  public async updateCompany(data: IUpdateCompany): Promise<ApiResult> {
    const {
      id,
      organization_id,
      name,
      industry,
      tax_id,
      address,
      phone,
      email,
      website,
      created_at,
    } = data;

    try {
      await prisma.$transaction(async (trx) => {
        return await trx.companies.updateMany({
          where: {
            id,
          },
          data: {
            organization_id,
            name,
            industry,
            tax_id,
            address,
            phone,
            email,
            website,
            created_at,
            updated_at: created_at
          },
        });
      });
      return ApiResult.success("Company updated successful");
    } catch (error: any) {
      console.log("updateCompany service Error", error);
      return ApiResult.error("Failed to update company", 500);
    }
  };
}
