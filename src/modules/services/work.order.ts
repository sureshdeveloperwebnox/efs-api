import { stringifyBigInts } from "../../middlewares";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { ICreateMaintenancePlanAsset, ICreateWorkOrder, IIDModel, IUpdateMaintenancePlanAsset } from "../model";
// Work Order Service
export class WorkOrder {
  // Create Work Order Service
  public async createWorkOrder(data: ICreateWorkOrder): Promise<ApiResult> {
    const {
      organization_id,
      customer_id,
      company_id,
      asset_id,
      maintenance_plan_id,
      title,
      description,
      priority,
      status,
      assigned_to,
      assigned_crew_id,
      scheduled_start_date,
      scheduled_end_date,
      actual_start_date,
      actual_end_date,
      currency_id,
      estimated_cost,
      actual_cost,
      address,
      city,
      state,
      postal_code,
      country,
      is_multi_day,
      date_time
    } = data;
    try {
      await prisma.$transaction(async (trx) => {
        return await trx.work_orders.create({
          data: {
            organization_id,
            customer_id,
            company_id,
            asset_id,
            maintenance_plan_id,
            title,
            description,
            priority,
            status,
            assigned_to,
            assigned_crew_id,
            scheduled_start_date,
            scheduled_end_date,
            actual_start_date,
            actual_end_date,
            currency_id,
            estimated_cost,
            actual_cost,
            address,
            city,
            state,
            postal_code,
            country,
            is_multi_day,
            created_at: date_time,
          },
        });
      });
      return ApiResult.success({}, "Work order created successful", 201);
    } catch (error: any) {
      console.log("createWorkOrder Error", error);
      return ApiResult.error("Failed to create maintenance plan asset", 500);
    }
  };


  public async getAllWorkOrder(data: IIDModel): Promise<ApiResult> {
    try {
      const result = await prisma.work_orders.findMany({
        where: { organization_id: BigInt(data.id) }
      })
      if (!result) {
        return ApiResult.success({}, "No data retrieved", 202);
      }

      const formattedResult = await stringifyBigInts(result);
      return ApiResult.success(
        formattedResult,
        "Successfully fetched work orders",
        200
      );

    } catch (error: any) {
      console.error("getWorkOrder", error);
      return ApiResult.error(
        error.message || "Failed to fetch work orders",
        500
      );
    }
  }

  // Get Work Order Service
  public async getWorkOrder(data: IIDModel): Promise<ApiResult> {
    try {
      // Only select required fields instead of entire row (better performance)
      const result = await prisma.work_orders.findFirst({
        where: { id: BigInt(data.id) },
      });
      if (!result) {
        return ApiResult.success({}, "No data retrieved", 202);
      }
      // Convert BigInt values to string (if needed) without deep clone
      const formattedResult = await stringifyBigInts(result);
      return ApiResult.success(
        formattedResult,
        "Successfully fetched work orders",
        200
      );
    } catch (error: any) {
      console.error("getWorkOrder", error);
      return ApiResult.error(
        error.message || "Failed to fetch work orders",
        500
      );
    }
  };
  
  // Update Work Order Service
  public async updateWorkOrder(data: IUpdateMaintenancePlanAsset): Promise<ApiResult> {
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

  public async assignWorkOrderToTechnician(data: any): Promise<ApiResult> {
    return ApiResult.error("Work will be on future", 500);
  };

  public async workOrderTaskStatus(data: any): Promise<ApiResult> {
    return ApiResult.error("Work will be on future", 500);
  }

}