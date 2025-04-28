import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import {
  ICreateWorkOrderApprovalModel,
  IUpdateWorkOrderApprovalModel,
  IWorkOrderApprovalModel,
} from "../model";

export class WorkOrderApproval {
  // Create Work Order Approval Service
  public async createWorkOrderApproval(data: ICreateWorkOrderApprovalModel): Promise<ApiResult> {
    const {
      work_order_id,
      approved_by,
      approval_status,
      date_time,
    } = data;
    try {
      await prisma.$transaction(async (trx) => {
        return await trx.work_order_approvals.create({
          data: {
            work_order_id,
            approved_by,
            approval_status,
            approved_at: date_time,
            created_at: date_time,
            updated_at: date_time
          },
        });
      });
      return ApiResult.success(
        {},
        "Work order approval created successful",
        201
      );
    } catch (error: any) {
      console.log("createWorkOrderApproval Service Error", error);
      return ApiResult.error("Failed to create work approval", 500);
    }
  }

  // Update Work Order Approval Service
  public async updateWorkOrderApproval(data: IUpdateWorkOrderApprovalModel): Promise<ApiResult> {
    const {
      id,
      work_order_id,
      approved_by,
      approval_status,
      approved_at,
      date_time,
    } = data;
    try {
      await prisma.$transaction(async (trx) => {
        return await trx.work_order_approvals.update({
          data: {
            work_order_id,
            approved_by,
            approval_status,
            approved_at,
            updated_at: date_time,
          },
          where: {
            id,
          },
        });
      });
      return ApiResult.success(
        {},
        "Work order approval updated successful",
        202
      );
    } catch (error: any) {
      console.log("updateWorkOrderApproval Service Error", error);
      return ApiResult.error("Failed to update work order approval", 500);
    }
  }

  // Work Order Approval Service
  public async workOrderApproval(data: IWorkOrderApprovalModel): Promise<ApiResult> {
    const { id, work_order_id, user_id, approval_status, date_time } = data;
    try {
      await prisma.$transaction(async (trx) => {
        return trx.work_order_approvals.update({
          data: {
            approved_by: user_id,
            approval_status,
            approved_at: date_time,
            updated_at: date_time
          },
          where: {
            id: BigInt(id),
            work_order_id
          }
        });
      });
      return ApiResult.success({}, approval_status === "APPROVED" ? "Work order approved" : "Work order rejected", 202 )
    } catch (error: any) {
      console.log("updateWorkOrderCrew Service Error", error);
      return ApiResult.error("Failed to update work order approval", 500);
    }
  }
}
