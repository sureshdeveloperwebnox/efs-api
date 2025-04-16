import prisma from "../../config/db";
import _ from "lodash";
import { stringifyBigInts } from "../../middlewares";
import { ApiResult } from "../../utils/api-result";
import { ICreateCrew, IIDModel } from "../model";

// Crew API Service

export class Crew {
  // Create Crew
  public async createCrew(data: ICreateCrew): Promise<ApiResult> {
    const { organization_id, name, leader_id, created_at } = data;

    try {
      await prisma.$transaction(async (trx) => {
        return await trx.crews.createMany({
          data: {
            organization_id: Number(organization_id),
            name,
            leader_id: Number(leader_id),
            created_at,
          },
        });
      });
      return ApiResult.success({}, "Crew created successfully.");
    } catch (error: any) {
      console.log("createCrew Error", error);
      return ApiResult.error("Failed to create crew", 500);
    }
  };

  // Get Crew By ID
  public async getCrewByID(data: IIDModel): Promise<ApiResult> {
    const { id } = data;
    try {
      const crew = await prisma.crews.findFirst({
        where: {
          id: Number(id),
        },
      });
      const result = await stringifyBigInts(crew); 

      if (_.isEmpty(crew)) {
        return ApiResult.success({}, "No crew found", 202);
      }
      return ApiResult.success(result, "Crew data retrieved successfully", 200);
    } catch (error: any) {
      console.log("getCrewByID Service Error", error);
      return ApiResult.error("Failed to fetch crew data", 500);
    }
  };
}
