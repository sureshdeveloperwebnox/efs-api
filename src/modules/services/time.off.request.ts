import { ApiResult } from "../../utils/api-result";
import prisma from "../../config/db";
import _ from "lodash";
import { stringifyBigInts } from "../../middlewares";
import {
  ITimeOffRequest,
  IUpdateTimeOffRequest,
} from "../model/time.off.request.model";

export class TimeOffRequest {
  public async createTimeOffRequest(data: ITimeOffRequest): Promise<ApiResult> {
    const { user_id, start_date, end_date, reason, status, created_at } = data;
    try {
      await prisma.$transaction(async (trx: any) => {
        return await trx.time_off_requests.createMany({
          data: {
            user_id,
            start_date,
            end_date,
            reason,
            status,
            created_at,
          },
        });
      });
      return ApiResult.success({}, "Time off request created successful", 201);
    } catch (error: any) {
      console.log("createTimeOffRequest", error);

      return ApiResult.error("Failed to add time off request", 500);
    }
  }

  public async getTimeOffRequestByID(data: { id: string }): Promise<ApiResult> {
    const { id } = data;
    try {
      const timeoffrequest = await prisma.time_off_requests.findFirst({
        where: {
          id: Number(id),
        },
      });
      const result = await stringifyBigInts(timeoffrequest); // Optional, if you're handling BigInts

      if (_.isEmpty(timeoffrequest)) {
        return ApiResult.success({}, "No data retrieved", 202);
      }
      return ApiResult.success(result, "Successful data retrieved", 200);
    } catch (error: any) {
      return ApiResult.error("Failed to fetch skills", 500);
    }
  }

  public async updateTimeOffRequest(data: IUpdateTimeOffRequest): Promise<ApiResult> {
    const { updated_at, id, status } = data;
    try {
      await prisma.$transaction(async (trx) => {
        return await trx.time_off_requests.update({
          data: {
            status,
            updated_at,
          },
          where: {
            id: Number(id),
          },
        });
      });
      return ApiResult.success(
        {},
        status == "APPROVED"
          ? "Time off request approved"
          : "Time off request denied",
        202
      );
    } catch (error: any) {
      return ApiResult.error("Failed to delete holiday", 500);
    }
  }
}
