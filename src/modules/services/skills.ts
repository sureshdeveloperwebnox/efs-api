import { ApiResult } from "../../utils/api-result";
import prisma from "../../config/db";
import _ from "lodash";
import { stringifyBigInts } from "../../middlewares";
import { ICreateSkills, IIDModel } from "../model";

export class Skills {

  // Create Skill API Service
  public async createSkill(data: ICreateSkills): Promise<ApiResult> {
    const { name, description, created_at } = data;
    try {
      //Check already skills exist
      const checkAlreadyExist = await prisma.skills.findFirst({
        where: {
          name: name,
        },
      });

      if (!_.isEmpty(checkAlreadyExist)) {
        return ApiResult.error("Skill name already exist", 202);
      }

      await prisma.$transaction(async (trx: any) => {
        return await trx.skills.createMany({
          data: {
            name,
            description,
            created_at,
          },
        });
      });
      return ApiResult.success({}, "Skill created successful", 201);
    } catch (error: any) {
      return ApiResult.error("Failed to add skill", 500);
    }
  };

  // Get Skill By ID API Service
  public async getSkillByID(data: IIDModel): Promise<ApiResult> {
    const { id } = data;
    try {

      const skills = await prisma.skills.findFirst({
        where: {
          id: Number(id),
        },
      });
      const result = await stringifyBigInts(skills); // Optional, if you're handling BigInts

      if (_.isEmpty(skills)) {
        return ApiResult.success({}, "No data retrieved", 202);
      }
      return ApiResult.success(result, "Successful data retrieved", 200);
    } catch (error: any) {
      return ApiResult.error("Failed to fetch skills", 500);
    }
  };

  // Get Skills API Service
  public async getSkills(): Promise<ApiResult> {
    try {
      console.log('>>>>>');
      
      const skills = await prisma.skills.findMany();
      console.log('skilss');
      
      const stringifyJSON = await stringifyBigInts(skills);
      console.log('stringifyJSON', stringifyJSON);
      
      if (_.isEmpty(skills)) {
        return ApiResult.success({}, "No data retrieved", 202);
      }

      return ApiResult.success(stringifyJSON, "Successful data retrieved", 200);
    } catch (error: any) {
      return ApiResult.error("Failed to fetch skills", 500);
    }
  };
};
