import { ApiResult } from "../../utils/api-result";
import prisma from "../../config/db";
import _ from "lodash";
import { stringifyBigInts } from "../../middlewares";
import { ICreateHoliday, IIDModel } from "../model";

// Holiday API Service
export class Holiday {
  // Create Holiday API Service
  public async createHoliday(data: ICreateHoliday): Promise<ApiResult> {
    const { organization_id, name, holiday_date, is_recurring, created_at } =
      data;
    try {
      //Check already holiday exist
      const checkAlreadyExist = await prisma.holidays.findFirst({
        where: {
          name: name,
        },
      });

      if (!_.isEmpty(checkAlreadyExist)) {
        return ApiResult.error("Holiday name already exist", 202);
      }

      await prisma.$transaction(async (trx: any) => {
        return await trx.holidays.createMany({
          data: {
            organization_id: Number(organization_id),
            name,
            holiday_date,
            is_recurring,
            created_at,
          },
        });
      });
      return ApiResult.success({}, "Holiday created successful", 201);
    } catch (error: any) {
      return ApiResult.error("Failed to add holiday", 500);
    }
  };

  // Get Holiday API Service
  public async getHolidayByID(data: IIDModel): Promise<ApiResult> {
    const { id } = data;
    try {
      const holiday = await prisma.holidays.findFirst({
        where: {
          id: Number(id),
        },
      });
      const result = await stringifyBigInts(holiday); // Optional, if you're handling BigInts

      if (_.isEmpty(holiday)) {
        return ApiResult.success({}, "No data retrieved", 202);
      }
      return ApiResult.success(result, "Successful data retrieved", 200);
    } catch (error: any) {
      return ApiResult.error("Failed to fetch skills", 500);
    }
  }

  // Delete Holiday API Service
  public async deleteHoliday(data: IIDModel): Promise<ApiResult> {
    const { id } = data;
    try {

      await prisma.$transaction(async(trx) => {
      return await trx.holidays.delete({
          where: {
            id: Number(id)
          },
        });
      })
      return ApiResult.success({}, "Successful holiday deleted", 202);
    } catch (error: any) {
      return ApiResult.error("Failed to delete holiday", 500);
    }
  }
}
