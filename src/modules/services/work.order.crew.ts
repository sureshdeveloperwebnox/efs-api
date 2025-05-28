import { stringifyBigInts } from "../../middlewares";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { ICreateWorkOrderCrewModel, IIDModel, IUpdateWorkOrderCrewModel } from "../model";

export class WorkOrderCrew {
  // Create Work Order Crew Service
  public async createWorkOrderCrew(data: ICreateWorkOrderCrewModel): Promise<ApiResult> {
    const { work_order_id, crew_id, assigned_at, date_time } = data;
    console.log("crew_data", data);

    try {
      await prisma.$transaction(async (trx) => {
        await trx.work_orders.updateMany({
          data: {
            assigned_crew_id: Number(crew_id),
            updated_at: date_time
          },
          where: { id: BigInt(work_order_id) }
        });

        // First find the existing record to get its id
        const existingCrew = await trx.work_order_crew.findFirst({
          where: {
            work_order_id: BigInt(work_order_id)
          }
        });

        if (existingCrew) {
          await trx.work_order_crew.delete({
            where: {
              id: existingCrew.id
            }
          });
        }

        return await trx.work_order_crew.create({
          data: {
            work_order_id: BigInt(work_order_id),
            crew_id: Number(crew_id),
            assigned_at,
            created_at: date_time,
          },
        });
      });
      return ApiResult.success({}, "Work order crew created successful", 201);
    } catch (error: any) {
      console.log("createWorkOrderCrew Service Error", error);
      return ApiResult.error("Failed to create work order crew", 500);
    }
  }

  // Update Work Order Crew Service
  public async updateWorkOrderCrew(data: IUpdateWorkOrderCrewModel): Promise<ApiResult> {
    const { id, work_order_id, crew_id, assigned_at, date_time } = data;
    try {
      await prisma.$transaction(async (trx) => {
        return await trx.work_order_crew.update({
          data: {
            work_order_id,
            crew_id,
            assigned_at,
            updated_at: date_time,
          },
          where: {
            id,
          },
        });
      });
      return ApiResult.success({}, "Work order crew updated successful", 202);
    } catch (error: any) {
      console.log("updateWorkOrderCrew Service Error", error);
      return ApiResult.error("Failed to update work order crew", 500);
    }
  }

  // Get Work Order Crew Service
  public async getWorkOrderCrew(data: IIDModel): Promise<ApiResult> {
    const { id } = data;
    try {
      const result = await prisma.work_order_crew.findFirst({
        where: {
          id: BigInt(id)
        },
        select: {
          id: true,
          crews: true,
          work_orders: {
            select: {
              id: true,
              title: true,
              description: true,
              scheduled_start_date: true,
              scheduled_end_date: true,
              actual_start_date: true,
              actual_end_date: true,
              estimated_cost: true,
              actual_cost: true,
              address: true,
              city: true,
              state: true,
              postal_code: true,
              country: true,
              companies: true,
              customers: true,
              work_order_assets: {
                select: {
                  assets: true
                }
              },
              work_order_tasks: {
                select: {
                  id: true,
                  task_name: true,
                  task_description: true,
                  due_date: true,
                  status: true
                }
              },
              work_order_services: {
                select: {
                  id: true,
                  services: true
                }
              }
            }
          }
        }
      });

      if (!result) {
        return ApiResult.success(
          {},
          "No Work order fetched",
          202
        );
      }
      const stringifyJSON = await stringifyBigInts(result);

      return ApiResult.success(
        stringifyJSON,
        "Work order crew fetched successful",
        200
      );
    } catch (error: any) {
      console.log("getWorkOrderCrew Service Error", error);
      return ApiResult.error("Failed to fetch work order crew", 500);
    }
  }
}
