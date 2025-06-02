import { PrismaClient } from "@prisma/client";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { IIDModel, IUpdateWorkOrder } from "../model";

// Work Order Service
export class WorkOrder {
  // Create Work Order
  public async createWorkOrder(data: any): Promise<ApiResult> {
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
      date_time,
      assets,
      services,
      tasks
    } = data;

    try {
      const result = await prisma.$queryRaw<{ p_work_order_id: bigint }[]>`
        CALL create_work_order_procedure(
          ${organization_id},
          ${customer_id},
          ${company_id},
          ${asset_id},
          ${maintenance_plan_id},
          ${title},
          ${description},
          ${priority},
          ${status},
          ${assigned_to},
          ${assigned_crew_id},
          ${scheduled_start_date},
          ${scheduled_end_date},
          ${actual_start_date},
          ${actual_end_date},
          ${currency_id},
          ${estimated_cost},
          ${actual_cost},
          ${address},
          ${city},
          ${state},
          ${postal_code},
          ${country},
          ${is_multi_day},
          ${date_time},
          ${services ? JSON.stringify(services) : null},
          ${tasks ? JSON.stringify(tasks) : null},
          ${assets ? JSON.stringify(assets) : null},
          NULL
        )
      `;

      const workOrderId = result[0]?.p_work_order_id;

      if (!workOrderId) throw new Error("Work order creation failed - no ID returned");

      return ApiResult.success(
        { workOrderId: Number(workOrderId) },
        "Work order created successfully",
        201
      );
    } catch (error: any) {
      console.error("createWorkOrder Error:", error.message);
      return ApiResult.error("Failed to create work order", 500);
    }
  }

  // Update Work Order
  public async updateWorkOrder(data: IUpdateWorkOrder): Promise<ApiResult> {
    const {
      id,
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
      date_time,
      assets,
      services,
      tasks
    } = data;

    try {
      await prisma.$executeRaw`
        CALL update_work_order_procedure(
          ${id},
          ${organization_id},
          ${customer_id},
          ${company_id},
          ${asset_id},
          ${maintenance_plan_id},
          ${title},
          ${description},
          ${priority},
          ${status},
          ${assigned_to},
          ${assigned_crew_id},
          ${scheduled_start_date},
          ${scheduled_end_date},
          ${actual_start_date},
          ${actual_end_date},
          ${currency_id},
          ${estimated_cost},
          ${actual_cost},
          ${address},
          ${city},
          ${state},
          ${postal_code},
          ${country},
          ${is_multi_day},
          ${date_time},
          ${services ? JSON.stringify(services) : null},
          ${tasks ? JSON.stringify(tasks) : null},
          ${assets ? JSON.stringify(assets) : null}
        )
      `;

      return ApiResult.success({}, "Work order updated successfully", 202);
    } catch (error: any) {
      console.error("updateWorkOrder Error:", error.message);
      return ApiResult.error("Failed to update work order", 500);
    }
  }

  // Get All Work Orders
  public async getAllWorkOrder(data: any): Promise<ApiResult> {
    const { organization_id } = data;

    try {
      const result = await prisma.$queryRaw<{ get_all_work_order_by_id: any }[]>`
        SELECT get_all_work_order_by_id(${organization_id})
      `;

      return ApiResult.success(result[0].get_all_work_order_by_id, "Work orders retrieved", 200);
    } catch (error: any) {
      return ApiResult.error("Failed to fetch work orders", 500);
    }
  }

  // Get Single Work Order
  public async getWorkOrder(data: IIDModel): Promise<ApiResult> {
    const { id } = data;

    try {
      const result = await prisma.$queryRaw<{ get_work_order_by_id: any }[]>`
        SELECT get_work_order_by_id(${id})
      `;

      return ApiResult.success(result[0].get_work_order_by_id, "Work order retrieved", 200);
    } catch (error: any) {
      return ApiResult.error("Failed to fetch work order", 500);
    }
  }

  // Assign Work Order to Technician
  public async assignWorkOrderToTechnician(data: any): Promise<ApiResult> {
    const { work_order_id, crew_id, assigned_at } = data;

    try {
      await prisma.$transaction(async (trx) => {
        await trx.work_orders.updateMany({
          data: { assigned_to: crew_id, assigned_at, status: "ASSIGNED" },
          where: { id: work_order_id }
        });

        await trx.work_order_tasks.updateMany({
          data: { assigned_to: crew_id },
          where: { work_order_id }
        });
      });

      return ApiResult.success({}, "Work order assigned", 202);
    } catch (error: any) {
      console.error("assignWorkOrderToTechnician Error", error);
      return ApiResult.error("Failed to assign work order", 500);
    }
  }

  // Update Work Order Task Status
  public async workOrderTaskStatus(data: any): Promise<ApiResult> {
    const { work_order_id, status } = data;

    try {
      await prisma.$transaction(async (trx) => {
        await trx.work_orders.updateMany({
          data: { status: "CONFIRMED" },
          where: { id: BigInt(work_order_id) }
        });

        await trx.work_order_tasks.updateMany({
          data: { status },
          where: { work_order_id }
        });
      });

      return ApiResult.success({}, `Work order task ${status === "IN_PROGRESS" ? "started" : "completed"}`, 202);
    } catch (error: any) {
      console.error("workOrderTaskStatus Error", error);
      return ApiResult.error("Failed to update task status", 500);
    }
  }
}
