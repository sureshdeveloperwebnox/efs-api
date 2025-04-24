import { stringifyBigInts } from "../../middlewares";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { ICreateAsset, IIDModel, IUpdateAsset } from "../model";

// Assets API Service

export class Assets {

  // Create Asset
  public async createAsset(data: ICreateAsset): Promise<ApiResult> {
    // Destructure the data
    const {
      organization_id,
      customer_id,
      asset_name,
      serial_number,
      model,
      manufacturer,
      status,
      location,
      notes,
      purchase_date,
      warranty_expiry,
      date_time,
    } = data;
    try {
      await prisma.$transaction(async (trx) => {
        return await trx.assets.create({
          data: {
            organization_id,
            customer_id,
            asset_name,
            serial_number,
            model,
            manufacturer,
            status,
            location,
            notes,
            purchase_date,
            warranty_expiry,
            created_at: date_time,
          },
        });
      });
      return ApiResult.success({}, "Asset created successful", 200);
    } catch (error: any) {
      console.log("createAsset Error", error);
      return ApiResult.error("Failed to asset", 500);
    }
  }

  // Get Asset details by ID Service
  public async getAssetByID(data: IIDModel ): Promise<ApiResult> {
    const { id } = data;
    try {
      
      // Only select required fields instead of entire row (better performance)
      const result = await prisma.assets.findFirst({
        where: { id: BigInt(id) }
      });

      if (!result) {
        return ApiResult.success({}, "No data retrieved", 202);
      }

      // Convert BigInt values to string (if needed) without deep clone
      const formattedResult = await stringifyBigInts(result);
      return ApiResult.success(
        formattedResult,
        "Successfully fetched assets",
        200
      );
    } catch (error: any) {
      console.error("getServiceTypeByID", error);
      return ApiResult.error(error.message || "Failed to fetch assets", 500);
    }
  }

  // Update Asset Service
  public async updateAsset(data: IUpdateAsset): Promise<ApiResult> {
    // Destructure the data
    const {
      id,
      organization_id,
      customer_id,
      asset_name,
      serial_number,
      model,
      manufacturer,
      status,
      location,
      notes,
      purchase_date,
      warranty_expiry,
      date_time,
    } = data;
    try {
      await prisma.$transaction(async (trx) => {
        return await trx.assets.update({
          data: {
            organization_id,
            customer_id,
            asset_name,
            serial_number,
            model,
            manufacturer,
            status,
            location,
            notes,
            purchase_date,
            warranty_expiry,
            updated_at: date_time,
          },
          where: {
            id: id,
          },
        });
      });
      return ApiResult.success({}, "Asset updated successful", 202);
    } catch (error: any) {
      console.log("updateAsset Error", error);
      return ApiResult.error("Failed to update asset", 500);
    }
  }
}
