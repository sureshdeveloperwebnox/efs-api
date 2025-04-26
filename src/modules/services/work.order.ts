import { stringifyBigInts } from "../../middlewares";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { ICreateWorkOrder, IIDModel, IUpdateWorkOrder } from "../model";

// Work Order Service
interface CreateWorkOrderResult {
  success: boolean;
  message: string;
  status_code: number;
  work_order_id: number;
}
export class WorkOrder {
  // Create Work Order Service
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
      assets,
      services,
      tasks
    } = data;

    try {
      // Make sure JSON data is properly stringified and passed as jsonb
    await prisma.$executeRawUnsafe(`
        CALL create_work_order(
          ${organization_id},
          ${customer_id},
          ${company_id},
          ${asset_id},
          ${maintenance_plan_id},
         ' ${title}',
         ' ${description}',
           '${priority}', 
           '${status}',
          ${assigned_to},
          ${assigned_crew_id},
          '${scheduled_start_date}',
         ' ${scheduled_end_date}',
         ' ${actual_start_date}',
          '${actual_end_date}',
          ${currency_id},
          ${estimated_cost},
          ${actual_cost},
         ' ${address}',
         ' ${city}',
         ' ${state}',
         ' ${postal_code}',
          '${country}',
           ${is_multi_day},
           ${services ? `'${JSON.stringify(services)}'::jsonb` : 'NULL'},
           ${tasks ? `'${JSON.stringify(tasks)}'::jsonb` : 'NULL'},
           ${assets ? `'${JSON.stringify(assets)}'::jsonb` : 'NULL'}
        )
      `);

      return ApiResult.success({ }, "Work order created", 201);
    } catch (error: any) {
      console.error("createWorkOrder Error:", error.message, error.stack);
      return ApiResult.error("Failed to create work order", 500);
    }
  }

  public async callProcedure() {
    try {
      const result = await prisma.$queryRawUnsafe(
        `SELECT proname::text FROM pg_proc WHERE proname = 'create_work_order';`
      );
      console.log(result);
      console.log('Procedure executed successfully.');
    } catch (error) {
      console.error('Error executing procedure:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
}
