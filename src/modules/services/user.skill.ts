import { ApiResult } from "../../utils/api-result";
import prisma from "../../config/db";
import { Prisma } from "@prisma/client";
import { ICreateUserSkills } from "../model";

// User Skills API Service
export class UserSkills {
  public async assignUserSkill(data: ICreateUserSkills): Promise<ApiResult> {
    try {
      const { user_id, skill_id, organization_id, proficiency_level } = data;

      await prisma.$transaction(async (trx) => {
        await trx.user_skills.create({
          data: {
            user_id: Number(user_id),
            skill_id: Number(skill_id),
            organization_id: Number(organization_id),
            proficiency_level,
            // Let database handle timestamps
          },
        });
      });
      return ApiResult.success({}, "Skill assigned successfully", 201);
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return ApiResult.error("This skill is already assigned to the user", 400);
        }
        if (error.code === 'P2003') {
          return ApiResult.error("Invalid user, skill, or organization reference", 400);
        }
      }
      return ApiResult.error("Failed to assign skill: " + error.message, 500);
    }
  }
}