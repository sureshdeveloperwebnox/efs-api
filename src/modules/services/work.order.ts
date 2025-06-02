import { PrismaClient } from "@prisma/client";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { IIDModel, IUpdateWorkOrder } from "../model";

// Work Order Service
export class WorkOrder {

  // create Work Order Service 
  // Note : Use Create Work Order Procedure 
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

    console.log("organization_id", organization_id);

    try {
      // Using the safer $queryRaw with template literals
      const result = await prisma.$queryRaw<{ p_work_order_id: bigint }[]>`(
      CALL create_work_order_procedure(
        ${organization_id}::bigint, 
        ${customer_id}::bigint, 
        ${company_id}::bigint, 
        ${asset_id}::bigint,
        ${maintenance_plan_id}::bigint,
        ${title}::text, 
        ${description}::text, 
        ${priority}::text, 
        ${status}::text, 
        ${assigned_to}::bigint,
        ${assigned_crew_id}::bigint,
        ${scheduled_start_date}::text, 
        ${scheduled_end_date}::text, 
        ${actual_start_date}::text, 
        ${actual_end_date}::text,
        ${currency_id}::int,
        ${estimated_cost}::numeric(10,2), 
        ${actual_cost}::numeric(10,2), 
        ${address}::text, 
        ${city}::text,
        ${state}::text, 
        ${postal_code}::text, 
        ${country}::text, 
        ${is_multi_day}::int,
        ${date_time}::text,
        ${services ? JSON.stringify(services) : null}::jsonb, 
        ${tasks ? JSON.stringify(tasks) : null}::jsonb, 
        ${assets ? JSON.stringify(assets) : null}::jsonb,
        NULL -- This will be populated with the work order ID
      ))`;

      // Extract the work order ID from the result
      const workOrderId = result[0]?.p_work_order_id;

      if (!workOrderId) {
        throw new Error('Work order creation failed - no ID returned');
      }

      return ApiResult.success(
        { workOrderId: Number(workOrderId) },
        "Work order created successfully",
        201
      );
    } catch (error: any) {
      console.error("createWorkOrder Error:", error.message, error.stack);
      return ApiResult.error(
        error.message.includes('Error creating work order')
          ? error.message
          : "Failed to create work order",
        500
      );
    }
  }

  // update Work Order Service
  // Note: Use Update Work Order Procedure
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


      // Using the safer $queryRaw with template literals
      const result = await prisma.$queryRaw`(
      CALL update_work_order_procedure(
           ${id}::bigint,
           ${organization_id}::bigint, 
           ${customer_id}::bigint, 
           ${company_id}::bigint, 
           ${asset_id}::bigint, 
           ${maintenance_plan_id}::bigint,
           ${title}::text, 
           ${description}::text, 
           ${priority}::text, 
           ${status}::text, 
           ${assigned_to}::bigint,
           ${assigned_crew_id}::bigint,
           ${scheduled_start_date}::text, 
           ${scheduled_end_date}::text, 
           ${actual_start_date}::text, 
           ${actual_end_date}::text,
           ${currency_id}::int, 
           ${estimated_cost}::numeric(10,2), 
           ${actual_cost}::numeric(10,2), 
           ${address}::text, 
           ${city}::text,
           ${state}::text, 
           ${postal_code}::text, 
           ${country}::text, 
           ${is_multi_day}::int,
           ${date_time}::text,
           ${services ? JSON.stringify(services) : null}::jsonb, 
           ${tasks ? JSON.stringify(tasks) : null}::jsonb, 
           ${assets ? JSON.stringify(assets) : null}::jsonb         
           ))
       `;

      // Extract the work order ID from the result
      console.log("result", result);


      return ApiResult.success({}, "Work order updated successful", 202)
    } catch (error: any) {
      console.error("updateWorkOrder Error:", error.message, error.stack);
      return ApiResult.error(
        error.message.includes('Error updating work order')
          ? error.message
          : "Failed to update work order",
        500
      );
    }
  }

  // get All Work Order Service
  // Note: Use Get All Work Order Procedure
  public async getAllWorkOrder(data: any): Promise<ApiResult> {
    const { organization_id } = data;

    try {
      // For a function that returns JSON:
      const result = await prisma.$queryRaw<{ get_all_work_order_by_id: any }[]>
        `SELECT get_all_work_order_by_id(${organization_id})`;
      console.log("result", result[0].get_all_work_order_by_id);


      return ApiResult.success(result[0].get_all_work_order_by_id, "Work order data retrieved", 200);
    } catch (error: any) {
      return ApiResult.error(
        error.message.includes('Error fetching work order')
          ? error.message
          : "Failed to fetch work order",
        500
      );
    }
  }

  // get Work Order Service
  // Note: Use Get Work Order Procedure
  public async getWorkOrder(data: IIDModel): Promise<ApiResult> {
    const { id } = data;
    try {
      // Correctly call the function with the ID
      const result = await prisma.$queryRawUnsafe<{ get_work_order_by_id: any }[]>(
        `SELECT get_work_order_by_id(${id})`
      );

      console.log("result", result);

      // Handle result
      const workOrderData = result[0]?.get_work_order_by_id ?? null;

      return ApiResult.success(workOrderData, "Work order data retrieved", 200);
    } catch (error: any) {
      return ApiResult.error(
        error.message.includes('Error fetching work order')
          ? error.message
          : "Failed to fetch work order",
        500
      );
    }
  }

  // assign Work Order To Technician
  public async assignWorkOrderToTechnician(data: any): Promise<ApiResult> {
    const { work_order_id, crew_id, assigned_at } = data;
    try {

      await prisma.$transaction(async (trx: PrismaClient) => {

        // update work order 
        await trx.work_orders.updateMany({
          data: {
            assigned_to: crew_id,
            assigned_at,
            status: "ASSIGNED"
          },
          where: {
            id: work_order_id
          }
        });

        // update work order task
        await trx.work_order_tasks.updateMany({
          data: {
            assigned_to: crew_id
          },
          where: {
            work_order_id
          }
        })
      });
      return ApiResult.success({}, "Work order assigned", 202)
    } catch (error: any) {
      console.log("assignWorkOrderToTechnician Error", error);
      return ApiResult.error(
        error.message.includes('Error assign work order')
          ? error.message
          : "Failed to assign work order",
        500
      );
    }
  }

  // work Order Task Status 
  public async workOrderTaskStatus(data: any): Promise<ApiResult> {
    const { work_order_id, status } = data;
    try {

      await prisma.$transaction(async (trx: PrismaClient) => {

        // update work order confirm
        await trx.work_orders.updateMany({
          data: {
            status: "CONFIRMED"
          },
          where: {
            id: BigInt(work_order_id)
          }
        });

        // update work order task 
        await trx.work_order_tasks.updateMany({
          data: {
            status,
          },
          where: {
            work_order_id
          }
        });

        return ApiResult.success({}, `Work order task ${status == "IN_PROGRESS" ? "started" : "completed"}`, 202)
      })
    } catch (error: any) {
      console.log("workOrderStatus Error", error);
      return ApiResult.error("Failed to start task")
    }
  }


}
