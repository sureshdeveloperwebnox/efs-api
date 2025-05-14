import { stringifyBigInts } from "../../middlewares";
import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { ICreateService, IDateTime, IIDModel, IUpdateService } from "../model";

// Service API
export class Service {
  // Create Service API
  public async createService(data: ICreateService): Promise<ApiResult> {
    const {
      organization_id,
      name,
      description,
      duration,
      price,
      required_skills,
    } = data;

    try {
      await prisma.$transaction(async (trx) => {
        return await trx.services.create({
          data: {
            organization_id,
            name,
            description,
            duration,
            price,
            required_skills: JSON.stringify(required_skills),
          },
        });
      });
      return ApiResult.success({}, "Service created sucessful", 201);
    } catch (error: any) {
      console.log("createService Error", error);
      return ApiResult.error("Failed create service", 500);
    }
  }

  // Get Service By ID API
  public async getServiceByID(data: IIDModel): Promise<ApiResult> {
    try {
      const start = performance.now();

      // Only select required fields instead of entire row (better performance)
      const result = await prisma.services.findFirst({
        where: { id: BigInt(data.id) },
        include: {
          organizations: {
            select: {
              id: true,
              name: true,
              organization_name: true,
              email: true,
              phone: true,
              website: true,
            },
          },
        },
      });

      if (!result) {
        return ApiResult.success({}, "No data retrieved", 409);
      }

      // Convert BigInt values to string (if needed) without deep clone
      const formattedResult = await stringifyBigInts(result);
      const end = performance.now();
      console.log(`API execution time: ${end - start}ms`);
      return ApiResult.success(
        formattedResult,
        "Successfully fetched services"
      );
    } catch (error: any) {
      console.error("Error fetching services:", error.message);
      return ApiResult.error(error.message || "Failed to fetch services", 500);
    }
  }

  // Update service API
  public async updateService(data: IUpdateService): Promise<ApiResult> {
    const {
      id,
      organization_id,
      name,
      description,
      duration,
      price,
      required_skills,
      date,
    } = data;

    console.log("data service", data);

    try {
      await prisma.$transaction(async (trx) => {
        return await trx.services.update({
          where: {
            id: id,
          },
          data: {
            organization_id,
            name,
            description,
            duration,
            price,
            required_skills: JSON.stringify(required_skills),
            updated_at: date,
          },
        });
      });
      return ApiResult.success({}, "Service updated sucessful", 202);
    } catch (error: any) {
      console.log("updateService Error", error);
      return ApiResult.error("Failed update service", 500);
    }
  }

  // Get All Service By ID API
  public async getAllService(): Promise<ApiResult> {
    try {
      // Only select required fields instead of entire row (better performance)
      const result = await prisma.services.findMany();

      if (!result) {
        return ApiResult.success({}, "No data retrieved", 409);
      }

      // Convert BigInt values to string (if needed) without deep clone
      const formattedResult = await stringifyBigInts(result);

      return ApiResult.success(
        formattedResult,
        "Successfully fetched services"
      );
    } catch (error: any) {
      console.error("Error fetching services:", error.message);
      return ApiResult.error(error.message || "Failed to fetch services", 500);
    }
  }
}
