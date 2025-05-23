import prisma from "../../config/db";
import _ from "lodash";
import { stringifyBigInts } from "../../middlewares";
import { ApiResult } from "../../utils/api-result";
import { ICreateCrew, IIDModel, IUpdateCrew } from "../model";

// Crew API Service

export class Crew {
  // Create Crew
  public async createCrew(data: ICreateCrew): Promise<ApiResult> {
    const { organization_id, name, leader_id, date_time } = data;

    try {
      await prisma.$transaction(async (trx) => {
        return await trx.crews.createMany({
          data: {
            organization_id: Number(organization_id),
            name,
            leader_id: Number(leader_id),
            created_at: date_time,
          },
        });
      });
      return ApiResult.success({}, "Crew created successfully.");
    } catch (error: any) {
      console.log("createCrew Error", error);
      return ApiResult.error("Failed to create crew", 500);
    }
  };

  // Get Crew
  public async getCrew(data: IIDModel): Promise<ApiResult> {
    const { id } = data;
    try {
      const crew = await prisma.crews.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          users: true
        }
      });
      const result = await stringifyBigInts(crew);

      if (_.isEmpty(crew)) {
        return ApiResult.success({}, "No crew found", 202);
      }
      return ApiResult.success(result, "Crew data fetched successfully", 200);
    } catch (error: any) {
      console.log("getCrew Service Error", error);
      return ApiResult.error("Failed to fetch crew data", 500);
    }
  };

  // Update Crew API Service
  public async updateCrew(data: IUpdateCrew): Promise<ApiResult> {
    const {
      id,
      leader_id,
      name,
      date_time,
    } = data;

    try {
      await prisma.$transaction(async (trx) => {
        await trx.crews.update({
          data: {
            name,
            leader_id: leader_id,
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

  // Get All Crew
  public async getAllCrew(data: any): Promise<ApiResult> {
    const { organization_id } = data;
    try {
      const crew = await prisma.crews.findMany({
        where: {
          organization_id: Number(organization_id),
        },
        include: {
          users: true
        }
      });
      const result = await stringifyBigInts(crew);

      if (_.isEmpty(crew)) {
        return ApiResult.success({}, "No crew found", 202);
      }
      return ApiResult.success(result, "Crew data fetched successfully", 200);
    } catch (error: any) {
      console.log("getCrew Service Error", error);
      return ApiResult.error("Failed to fetch crew data", 500);
    }
  };

  // Get All Crew By ID
  public async getAllCrewByID(data?: any): Promise<ApiResult> {
    const { crew_name, organization_id } = data || {};
  
    try {
      // Return nothing if neither ID is provided
      if (!crew_name && !organization_id) {
        return ApiResult.success({}, "No data retrieved", 200);
      }
  
      // Build where clause based on provided IDs
      const whereClause: any = {};
      if (crew_name) {
        whereClause.crew_name = crew_name;
      }
      if (organization_id) {
        whereClause.organization_id = organization_id;
      }
  
      const result = await prisma.crews.findMany({
        where: whereClause,
        include: {
          users: {
            select: {
              id: true,
              job_title: true,
              user_type: true,
            },
          },
          organizations: {
            select: {
              name: true,
            },
          },
        },
      });
  
      if (!result || result.length === 0) {
        return ApiResult.success({}, "No data retrieved", 409);
      }
  
      const formattedResult = await stringifyBigInts(result);
      return ApiResult.success(formattedResult, "Successfully fetched customers");
    } catch (error: any) {
      console.error("getAllCustomer Error:", error.message);
      return ApiResult.error(error.message || "Failed to fetch customers", 500);
    }
  }
}
