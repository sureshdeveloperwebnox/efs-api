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
  // public async createWorkOrder(data: any): Promise<ApiResult> {
  //   const {
  //     organization_id,
  //     customer_id,
  //     company_id,
  //     asset_id,
  //     maintenance_plan_id,
  //     title,
  //     description,
  //     priority,
  //     status,
  //     assigned_to,
  //     assigned_crew_id,
  //     scheduled_start_date,
  //     scheduled_end_date,
  //     actual_start_date,
  //     actual_end_date,
  //     currency_id,
  //     estimated_cost,
  //     actual_cost,
  //     address,
  //     city,
  //     state,
  //     postal_code,
  //     country,
  //     is_multi_day,
  //     date_time,
  //     assets,
  //     services,
  //     tasks
  //   } = data;

  //   try {
  //     // Make sure JSON data is properly stringified and passed as jsonb
  //   await prisma.$executeRawUnsafe(`
  //       CALL create_work_order_proc(
  //         ${organization_id},
  //         ${customer_id},
  //         ${company_id},
  //         ${asset_id},
  //         ${maintenance_plan_id},
  //        ' ${title}',
  //        ' ${description}',
  //          '${priority}', 
  //          '${status}',
  //         ${assigned_to},
  //         ${assigned_crew_id},
  //         '${scheduled_start_date}',
  //        ' ${scheduled_end_date}',
  //        ' ${actual_start_date}',
  //         '${actual_end_date}',
  //         ${currency_id},
  //         ${estimated_cost},
  //         ${actual_cost},
  //        ' ${address}',
  //        ' ${city}',
  //        ' ${state}',
  //        ' ${postal_code}',
  //         '${country}',
  //          ${is_multi_day},
  //          '${date_time}',
  //          ${services ? `'${JSON.stringify(services)}'::jsonb` : 'NULL'},
  //          ${tasks ? `'${JSON.stringify(tasks)}'::jsonb` : 'NULL'},
  //          ${assets ? `'${JSON.stringify(assets)}'::jsonb` : 'NULL'}
  //       )
  //     `);

  //     return ApiResult.success({ }, "Work order created", 201);
  //   } catch (error: any) {
  //     console.error("createWorkOrder Error:", error.message, error.stack);
  //     return ApiResult.error("Failed to create work order", 500);
  //   }
  // }

//   public async createWorkOrder(data: any): Promise<ApiResult> {
//     const {
//       organization_id,
//       customer_id,
//       company_id,
//       asset_id,
//       maintenance_plan_id,
//       title,
//       description,
//       priority,
//       status,
//       assigned_to,
//       assigned_crew_id,
//       scheduled_start_date,
//       scheduled_end_date,
//       actual_start_date,
//       actual_end_date,
//       currency_id,
//       estimated_cost,
//       actual_cost,
//       address,
//       city,
//       state,
//       postal_code,
//       country,
//       is_multi_day,
//       date_time,
//       assets,
//       services,
//       tasks
//     } = data;

//     try {
//       // Use parameterized query to prevent SQL injection
//       const result = await prisma.$queryRawUnsafe<{ p_work_order_id: bigint }[]>(`
//         CALL create_work_order_test(
//           $1::bigint, $2::bigint, $3::bigint, $4::bigint, $5::bigint,
//           $6::text, $7::text, $8::text, $9::text, $10::bigint,
//           $11::bigint, $12::text, $13::text, $14::text, $15::text,
//           $16::integer, $17::numeric(10,2), $18::numeric(10,2), $19::text, $20::text,
//           $21::text, $22::text, $23::text, $24::integer, $25::text,
//           $26::jsonb, $27::jsonb, $28::jsonb,
//           NULL -- This will be populated with the work order ID
//         )
//       `,
//         organization_id,
//         customer_id,
//         company_id,
//         asset_id,
//         maintenance_plan_id,
//         title,
//         description,
//         priority,
//         status,
//         assigned_to,
//         assigned_crew_id,
//         scheduled_start_date,
//         scheduled_end_date,
//         actual_start_date,
//         actual_end_date,
//         currency_id,
//         estimated_cost,
//         actual_cost,
//         address,
//         city,
//         state,
//         postal_code,
//         country,
//         is_multi_day,
//         date_time,
//         services ? JSON.stringify(services) : null,
//         tasks ? JSON.stringify(tasks) : null,
//         assets ? JSON.stringify(assets) : null
//       );

//       // Extract the work order ID from the result
//       const workOrderId = result[0]?.p_work_order_id;

//       if (!workOrderId) {
//         throw new Error('Work order creation failed - no ID returned');
//       }

//       return ApiResult.success(
//         { workOrderId: Number(workOrderId) }, 
//         "Work order created successfully", 
//         201
//       );
//     } catch (error: any) {
//       console.error("createWorkOrder Error:", error.message, error.stack);
//       return ApiResult.error(
//         error.message.includes('Error creating work order') 
//           ? error.message 
//           : "Failed to create work order",
//         500
//       );
//     }
// }


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
    // Using the safer $queryRaw with template literals
    const result = await prisma.$queryRaw<{ p_work_order_id: bigint }[]>`
      CALL create_work_order_test(
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
        ${currency_id}::integer, 
        ${estimated_cost}::numeric(10,2), 
        ${actual_cost}::numeric(10,2), 
        ${address}::text, 
        ${city}::text,
        ${state}::text, 
        ${postal_code}::text, 
        ${country}::text, 
        ${is_multi_day}::integer, 
        ${date_time}::text,
        ${services ? JSON.stringify(services) : null}::jsonb, 
        ${tasks ? JSON.stringify(tasks) : null}::jsonb, 
        ${assets ? JSON.stringify(assets) : null}::jsonb,
        NULL -- This will be populated with the work order ID
      )
    `;

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
