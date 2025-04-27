import prisma from "../../config/db";
import _ from "lodash";
import { stringifyBigInts } from "../../middlewares";
import { ApiResult } from "../../utils/api-result";
import { ICreateCrewMember, IIDModel } from "../model";

// Crew Member API Service
export class CrewMember {
    
  // Create Crew Member
  public async createCrewMember(data: ICreateCrewMember): Promise<ApiResult> {
    const { organization_id, crew_id, user_id, role, date_time } = data;
    try {
      console.log('data', data);
      
      await prisma.$transaction(async (trx) => {
        return await trx.crew_members.create({
          data: {
            organization_id,
            crew_id,
            user_id,
            role,
            created_at: date_time,
          },
        });
      });
      return ApiResult.success({}, "Crew member created successful", 201);
    } catch (error: any) {
      console.log("createCrewMember Error", error);
      return ApiResult.error("Failed to create crew member", 501);
    }
  }

  // Get Crew Member By ID
  public async getCrewMember(data: IIDModel): Promise<ApiResult> {
    const { id } = data;
    try {
      const crew = await prisma.crew_members.findFirst({
        where: {
          id: Number(id),
        },
      });
      const result = await stringifyBigInts(crew);

      if (_.isEmpty(crew)) {
        return ApiResult.success({}, "No crew found", 202);
      }
      return ApiResult.success(
        result,
        "Crew member data retrieved successfully",
        200
      );
    } catch (error: any) {
      console.log("getCrewMemebrByID Service Error", error);
      return ApiResult.error("Failed to fetch crew data", 500);
    }
  }
}
