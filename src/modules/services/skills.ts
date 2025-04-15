import { ApiResult } from "../../utils/api-result";
import prisma from "../../config/db";
import { ISkills, SkillsParams } from "../model/skills.model";
import _ from "lodash";
import { stringifyBigInts } from "../../middlewares";

export class Skills {
  public async createSkill(data: ISkills): Promise<ApiResult> {
    const { name, description, created_at } = data;
    try {
      //Check already skills exist
      const checkAlreadyExist = await prisma.skills.findFirst({
        where: {
          name: name,
        },
      });

      if (!_.isEmpty(checkAlreadyExist)) {
        return ApiResult.error("Skills already exist", 202);
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
  }

  public async getSkillByID(data: { id: SkillsParams }): Promise<ApiResult> {
    const { id } = data;
    try {
      console.log("iddd", id);

      const skills = await prisma.skills.findFirst({
        where: {
          id: Number(id),
        },
      });
      console.log("skills", skills);
      const result = await stringifyBigInts(skills); // Optional, if you're handling BigInts

      if (_.isEmpty(skills)) {
        return ApiResult.success({}, "No data retrieved", 202);
      }
      return ApiResult.success(result, "Successful data retrieved", 200);
    } catch (error: any) {
      return ApiResult.error("Failed to fetch skills", 500);
    }
  }

  public async getSkills(): Promise<ApiResult> {
    try {
      const skills = await prisma.skills.findMany();
      if (_.isEmpty(skills)) {
        return ApiResult.success({}, "No data retrieved", 202);
      }
      return ApiResult.success(skills, "Successful data retrieved", 200);
    } catch (error: any) {
      return ApiResult.error("Failed to fetch skills", 500);
    }
  }
}
