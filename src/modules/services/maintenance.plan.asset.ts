import { stringifyBigInts } from "../../middlewares";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { ICreateMaintenancePlanAsset, IIDModel, IUpdateMaintenancePlanAsset } from "../model";

// Maintenance Plan Asset Service
export class MaintenancePlanAsset {

  // Create Maintenance Plan Asset Service
  public async createMaintenancePlanAsset(data: ICreateMaintenancePlanAsset): Promise<ApiResult> {
    const {
      maintenance_plan_id,
      asset_id,
      assigned_at,
      date_time,
    } = data;

    try {
      await prisma.$transaction(async (trx) => {
        return await trx.maintenance_plan_assets.create({
          data: {
            maintenance_plan_id,
            asset_id,
            assigned_at,
            created_at: date_time,
          },
        });
      });
      return ApiResult.success({}, "Maintenance plan asset created successful", 201);
    } catch (error: any) {
      console.log("createMaintenancePlanAsset Error", error);
      return ApiResult.error("Failed to create maintenance plan asset", 500);
    }
  };

  // Get Maintenance Plan Asset Service
  public async getMaintenancePlanAsset(data: IIDModel): Promise<ApiResult> {
    try {
      // Only select required fields instead of entire row (better performance)
      const result = await prisma.maintenance_plan_assets.findFirst({
        where: { id: BigInt(data.id) },
      });

      if (!result) {
        return ApiResult.success({}, "No data retrieved", 202);
      }

      // Convert BigInt values to string (if needed) without deep clone
      const formattedResult = await stringifyBigInts(result);
      return ApiResult.success(
        formattedResult,
        "Successfully fetched maintenance plan assets",
        200
      );
    } catch (error: any) {
      console.error("getMaintenancePlanAsset", error);
      return ApiResult.error(
        error.message || "Failed to fetch maintenance plan assets",
        500
      );
    }
  };

  // Update Maintenance Plan Asset Service
  public async updateMaintenancePlanAsset(data: IUpdateMaintenancePlanAsset): Promise<ApiResult> {
    const {
      id,
      maintenance_plan_id,
      asset_id,
      assigned_at,
      date_time,
    } = data;

    try {
      await prisma.$transaction(async (trx) => {
        return await trx.maintenance_plan_assets.update({
          data: {
            maintenance_plan_id,
            asset_id,
            assigned_at,
            created_at: date_time,
          },
          where: {
            id: id
          }
        });
      });
      return ApiResult.success({}, "Maintenance plan asset updated successful", 201);
    } catch (error: any) {
      console.log("updateMaintancePlan Error", error);
      return ApiResult.error("Failed to update maintenance plan", 500);
    }
  };
}
