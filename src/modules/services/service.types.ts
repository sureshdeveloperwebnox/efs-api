import { stringifyBigInts } from "../../middlewares";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import {
  ICreatePart,
  ICreateServiceType,
  IIDModel,
  IUpdateServiceType,
} from "../model";

// Service Types API Service

export class ServiceTypes {
  // Create Service Type
  public async createServiceType(data: ICreateServiceType): Promise<ApiResult> {
    // Destructure the data
    const { organization_id, name, description, date_time } = data;
    try {
      await prisma.$transaction(async (trx) => {
        return await trx.service_types.create({
          data: {
            organization_id,
            name,
            description,
            created_at: date_time,
          },
        });
      });
      return ApiResult.success({}, "Service type created successful", 200);
    } catch (error: any) {
      console.log("createServiceType Error", error);
      return ApiResult.error("Failed to service type", 500);
    }
  }

  // Get Service Type
  public async getServiceType(data: IIDModel): Promise<ApiResult> {
    try {
      // Only select required fields instead of entire row (better performance)
      const result = await prisma.service_types.findFirst({
        where: { id: BigInt(data.id) },
      });

      if (!result) {
        return ApiResult.success({}, "No data retrieved", 202);
      }

      // Convert BigInt values to string (if needed) without deep clone
      const formattedResult = await stringifyBigInts(result);
      return ApiResult.success(
        formattedResult,
        "Successfully fetched service types",
        200
      );
    } catch (error: any) {
      console.error("getServiceTypeByID", error);
      return ApiResult.error(
        error.message || "Failed to fetch service types",
        500
      );
    }
  }

  // Update Service Types Service
  public async updateServiceType(data: IUpdateServiceType): Promise<ApiResult> {
    // Destructure the data
    const { id, organization_id, name, description, date_time } = data;
    try {
      await prisma.$transaction(async (trx) => {
        return await trx.service_types.update({
          data: {
            organization_id,
            name,
            description,
            updated_at: date_time,
          },
          where: {
            id: id,
          },
        });
      });
      return ApiResult.success({}, "Service type updated successful", 202);
    } catch (error: any) {
      console.log("updateServiceType Error", error);
      return ApiResult.error("Failed to update service type", 500);
    }
  }

 
}
