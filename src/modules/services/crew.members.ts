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
           include: {
          users: true,
          crews: true
        }
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

  // Get All Crew Member
  public async getAllCrewMember(data: any): Promise<ApiResult> {
    const { organization_id } = data;
    try {
      const crew = await prisma.crew_members.findMany({
        where: {
          organization_id: BigInt(organization_id),
        },
        include: {
          users: true,
          crews: true
        }
      });
      const result = await stringifyBigInts(crew);

      if (_.isEmpty(crew)) {
        return ApiResult.success({}, "No crew member found", 202);
      }
      return ApiResult.success(
        result,
        "Crew member data retrieved successfully",
        200
      );
    } catch (error: any) {
      console.log("getAllCrewMember Service Error", error);
      return ApiResult.error("Failed to fetch crew member data", 500);
    }
  }

   // Update Crew Member API Service
    public async updateCrewMeember(data: any): Promise<ApiResult> {
      const {
        id,
        user_id,
        crew_id,
        role,
        date_time,
      } = data;
  
      try {
        await prisma.$transaction(async (trx) => {
          await trx.crew_members.update({
            data: {
              role,
              user_id,
              crew_id,
              updated_at: date_time,
            },
  
            where: {
              id: id,
            },
          });
  
  
        });
        return ApiResult.success({}, "Customer updated successful", 202);
      } catch (error: any) {
        console.log("updateCustomer service Error", error);
        return ApiResult.error("Failed to update customer", 500);
      }
    }


}
