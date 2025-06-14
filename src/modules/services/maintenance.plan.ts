import { stringifyBigInts } from "../../middlewares";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { ICreateMaintenancePlan, IIDModel, IUpdateMaintenancePlan } from "../model";

// Maintenance Plan Service
export class MaintenancePlan {

  // Create Maintenance Plan Service
  public async createMaintenancePlan(data: ICreateMaintenancePlan): Promise<ApiResult> {
    const {
      organization_id,
      name,
      description,
      start_date,
      end_date,
      frequency,
      frequency_unit,
      frequency_unit_type,
      is_active,
      date_time,
    } = data;

    try {
      await prisma.$transaction(async (trx) => {
        return await trx.maintenance_plans.create({
          data: {
            organization_id,
            name,
            description,
            start_date,
            end_date,
            frequency,
            frequency_unit,
            frequency_unit_type,
            is_active,
            created_at: date_time,
          },
        });
      });
      return ApiResult.success({}, "Maintenance plan created successful", 201);
    } catch (error: any) {
      console.log("createMaintancePlan Error", error);
      return ApiResult.error("Failed to create maintenance plan", 500);
    }
  };

  // Get Maintenance Plan Service
  public async getMaintenancePlan(data: IIDModel): Promise<ApiResult> {
    try {
      // Only select required fields instead of entire row (better performance)
      const result = await prisma.maintenance_plans.findFirst({
        where: { id: BigInt(data.id) },
      });

      if (!result) {
        return ApiResult.success({}, "No data retrieved", 202);
      }

      // Convert BigInt values to string (if needed) without deep clone
      const formattedResult = await stringifyBigInts(result);
      return ApiResult.success(
        formattedResult,
        "Successfully fetched maintenance plan",
        200
      );
    } catch (error: any) {
      console.error("getMaintenancePlan", error);
      return ApiResult.error(
        error.message || "Failed to fetch maintenance plan",
        500
      );
    }
  };

  // Update Maintenance Plan Service
  public async updateMaintenancePlan(data: IUpdateMaintenancePlan): Promise<ApiResult> {
    const {
      id,
      organization_id,
      name,
      description,
      start_date,
      end_date,
      frequency,
      frequency_unit,
      frequency_unit_type,
      is_active,
      date_time,
    } = data;

    try {
      await prisma.$transaction(async (trx) => {
        return await trx.maintenance_plans.update({
          data: {
            organization_id,
            name,
            description,
            start_date,
            end_date,
            frequency,
            frequency_unit,
            frequency_unit_type,
            is_active,
            created_at: date_time,
          },
          where: {
            id: id
          }
        });
      });
      return ApiResult.success({}, "Maintenance plan updated successful", 201);
    } catch (error: any) {
      console.log("updateMaintancePlan Error", error);
      return ApiResult.error("Failed to update maintenance plan", 500);
    }
  };


    // Get All Maintenance Plan Service
 public async getAllMaintenancePlanByID(data?: any): Promise<ApiResult> {
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
 
     const result = await prisma.maintenance_plans.findMany({
       where: whereClause
     });
 
     if (!result || result.length === 0) {
       return ApiResult.success({}, "No data retrieved", 409);
     }
 
     const formattedResult = await stringifyBigInts(result);
     return ApiResult.success(formattedResult, "Successfully fetched maintenance plans");
   } catch (error: any) {
     console.error("getAllCustomer Error:", error.message);
     return ApiResult.error(error.message || "Failed to fetch maintenance plans", 500);
   }
 }
}
