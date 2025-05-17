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
  public async getAssetByID(data: IIDModel): Promise<ApiResult> {
    const { id } = data;
    try {
      // Only select required fields instead of entire row (better performance)
      const result = await prisma.assets.findFirst({
        where: { id: BigInt(id) },
        include: {
          organizations: {
            select: {
              id: true,
              name: true,
              organization_name: true,
              email: true,
              phone: true,
              website: true,
            },
          },
          customers: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone: true,
            },
          },
        },
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

  // Get All Assets Service
  public async getAllAssets(data:any): Promise<ApiResult> {
    const { organization_id } = data
    try {
      // Only select required fields instead of entire row (better performance)
      const result = await prisma.assets.findMany({
        where: {
          organization_id: organization_id
        },
        include: {
          organizations: {
            select: {
              id: true,
              name: true,
              organization_name: true,
              email: true,
              phone: true,
            },
          },
          customers: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone: true,
            },
          },
        },
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
      console.error("getAllAsset", error);
      return ApiResult.error(error.message || "Failed to fetch assets", 500);
    }
  }

  // Get All Assets Service
  public async getAllAssetByID(data?: any): Promise<ApiResult> {
    const { organization_id } = data || {};

    try {
      // Return nothing if neither ID is provided
      if (!organization_id) {
        return ApiResult.success({}, "No data retrieved", 200);
      }

      // Build where clause based on provided IDs
      const whereClause: any = {};

      if (organization_id) {
        whereClause.organization_id = organization_id;
      }

      const result = await prisma.assets.findMany({
        where: whereClause,
      });

      if (!result || result.length === 0) {
        return ApiResult.success({}, "No data retrieved", 409);
      }

      const formattedResult = await stringifyBigInts(result);
      return ApiResult.success(formattedResult, "Successfully fetched assets");
    } catch (error: any) {
      console.error("getAllAssetByID Error:", error.message);
      return ApiResult.error(error.message || "Failed to fetch assets", 500);
    }
  }
}
