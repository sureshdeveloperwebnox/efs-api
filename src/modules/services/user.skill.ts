import { ApiResult } from "../../utils/api-result";
import prisma from "../../config/db";
import _ from "lodash";
import { stringifyBigInts } from "../../middlewares";
import { IUserSkills } from "../model/user.skills.model";

export class UserSkills {
  public async assignUserSkill(data: IUserSkills): Promise<ApiResult> {
    try {
      const {
        user_id,
        skill_id,
        organization_id,
        proficiency_level,
        created_at,
      } = data;

      await prisma.$transaction(async (trx: any) => {
        return await trx.user_skills.createMany({
          data: {
            user_id,
            skill_id,
            organization_id,
            proficiency_level,
            created_at,
          },
        });
      });
      return ApiResult.success({}, "Skill created successful", 201);
    } catch (error: any) {
      return ApiResult.error("Failed to add skill", 500);
    }
  }
}
