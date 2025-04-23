import { stringifyBigInts } from "../../middlewares";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { ICreatePart, IDateTime, IIDModel, IUpdatePart } from "../model";

export class Parts {
  // Create Part Service
  public async createPart(data: ICreatePart): Promise<ApiResult> {
    // Destructure the data
    const {
      organization_id,
      name,
      description,
      price,
      inventory_count,
      reorder_level,
      date_time,
    } = data;
    try {
      await prisma.$transaction(async (trx) => {
        return await trx.parts.create({
          data: {
            organization_id,
            name,
            description,
            price,
            inventory_count,
            reorder_level,
            created_at: date_time,
          },
        });
      });
      return ApiResult.success({}, "Part created successful", 200);
    } catch (error: any) {
      console.log("createPart Error", error);
      return ApiResult.error("Failed to create part", 500);
    }
  }

  // Get Part details by ID
  public async getPartByID(data: any  ): Promise<ApiResult> {
    try {
      
      // Only select required fields instead of entire row (better performance)
      const result = await prisma.parts.findFirst({
        where: { id: BigInt(data) }
      });

      if (!result) {
        return ApiResult.success({}, "No data retrieved", 202);
      }

      // Convert BigInt values to string (if needed) without deep clone
      const formattedResult = await stringifyBigInts(result);
      return ApiResult.success(
        formattedResult,
        "Successfully fetched parts",
        200
      );
    } catch (error: any) {
      console.error("getPartByID", error);
      return ApiResult.error(error.message || "Failed to fetch parts", 500);
    }
  }

  // Update Part Service
  public async updatePart(data: IUpdatePart): Promise<ApiResult> {
    // Destructure the data
    const {
      id,
      organization_id,
      name,
      description,
      price,
      inventory_count,
      reorder_level,
      date_time,
    } = data;
    try {
      await prisma.$transaction(async (trx) => {
        return await trx.parts.update({
          data: {
            organization_id,
            name,
            description,
            price,
            inventory_count,
            reorder_level,
            updated_at: date_time,
          },
          where: {
            id: id,
          },
        });
      });
      return ApiResult.success({}, "Part updated successful", 202);
    } catch (error: any) {
      console.log("updatePart Error", error);
      return ApiResult.error("Failed to update part", 500);
    }
  }
}
