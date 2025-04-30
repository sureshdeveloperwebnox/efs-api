import _ from "lodash";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { stringifyBigInts } from "../../middlewares";
import { ICreateBusinessHoursModel, IIDModel } from "../model";

// Business Hours API Service
export class BusinessHours {
  // Create Business Hours API Service
  public async createBusinessHours(data: ICreateBusinessHoursModel): Promise<ApiResult> {
    const { organization_id, day_of_week, start_time, end_time, date_time } =
      data;
    try {
      await prisma.$transaction(async (trx) => {
        return await trx.business_hours.createMany({
          data: {
            organization_id: Number(organization_id),
            day_of_week,
            start_time,
            end_time,
            created_at: date_time 
          },
        });
      });
      return ApiResult.success({}, "Successfully business hours created");
    } catch (error: any) {
      return ApiResult.error("Failed to create Business Hours");
    }
  }

  // Get Business Hour API Service
  public async getBusinessHour(data:IIDModel): Promise<ApiResult> {
    const { id } = data;
    try {
      const result = await prisma.business_hours.findFirst({
        where: {
          id: Number(id),
        },
      });
      const stingifyJSON = await stringifyBigInts(result);
      if (_.isEmpty(result)) {
        return ApiResult.success({}, "No data fetched", 202);
      }
      return ApiResult.success(
        stingifyJSON,
        "Successfully fetched business hours",
        200
      );
    } catch (error: any) {
      console.log("getBusinessHour error", error);
      
      return ApiResult.error("Failed to retrieve business hours");
    }
  }

  // Get All Business Hours API Service
  public async getAllBusinessHour(): Promise<ApiResult> {
    try {
      const result = await prisma.business_hours.findMany();
      const stingifyJSON = await stringifyBigInts(result);
      if (_.isEmpty(result)) {
        return ApiResult.success({}, "No data retrieved", 202);
      }
      return ApiResult.success(
        stingifyJSON,
        "Successfully data retrieved",
        200
      );
    } catch (error: unknown) {
      console.log('getAllBusinessHour Error', error);
      return ApiResult.error("Failed to retrieve business hours", 501);
    }
  }
}
