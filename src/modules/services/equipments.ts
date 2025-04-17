import prisma from "../../config/db";
import { ApiResult } from "../../utils/api-result";
import { ICreateEquipmentModel, IIDModel, IUpdateEquipmentModel } from "../model";
import { stringifyBigInts } from "../../middlewares";

export class Equipments {

  // Create Equipment API Service
  public async createEquipment(data: ICreateEquipmentModel): Promise<ApiResult> {

    const {
      organization_id,
      name,
      equipment_type,
      status,
      location,
      availability_date,
      created_at,
    } = data;

    try {
      await prisma.$transaction(async (trx) => {
        return await trx.equipments.createMany({
          data: {
            organization_id,
            name,
            equipment_type,
            status,
            location,
            availability_date,
            created_at,
          },
        });
      });
      return ApiResult.success("Equipments created successful");
    } catch (error: any) {
      console.log("createEquipments service Error", error);
      return ApiResult.error("Failed to create equipments", 500);
    }
  };

  // Get Equipments details by ID API Service
  public async getEquipmentsByID(data: IIDModel): Promise<ApiResult> {
    try {
      const start = performance.now();

      // Only select required fields instead of entire row (better performance)
      const result = await prisma.equipments.findFirst({
        where: { id: BigInt(data.id) },
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
        "Successfully fetched equipments"
      );
    } catch (error: any) {
      console.error("Error fetching equipments:", error.message);
      return ApiResult.error(
        error.message || "Failed to fetch equipments",
        500
      );
    }
  };

   // Update Equipment API Service
   public async updateEquipment(data: IUpdateEquipmentModel): Promise<ApiResult> {
    const {
      id,
      organization_id,
      name,
      equipment_type,
      status,
      location,
      availability_date,
      created_at,
    } = data;

    try {
      await prisma.$transaction(async (trx) => {
        return await trx.equipments.updateMany({
            where: {
                id
            },
            data: {
                organization_id,
                name,
                equipment_type,
                status,
                location,
                availability_date,
                created_at,
              },
        });
      });
      return ApiResult.success("Equipments updated successful");
    } catch (error: any) {
      console.log("updateEquipment service Error", error);
      return ApiResult.error("Failed to update equipments", 500);
    }
  };
  
}
