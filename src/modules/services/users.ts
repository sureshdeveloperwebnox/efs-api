import { ApiResult } from "../../utils/api-result";
import prisma from "../../config/db";
import bcrypt from "bcrypt";
import { stringifyBigInts } from "../../middlewares";
import { ICreateUser, IEditUser, IIDModel } from "../model";
import { PrismaClient } from "@prisma/client";

// User API Service
export class User {
  // User Register API
  public async register(userData: any): Promise<ApiResult> {
    const {
      first_name,
      last_name,
      organization_id,
      isVerified_Email,
      isVerified_PhoneNumber,
      email,
      phone,
      job_title,
      user_type,
      is_active,
      email_verified,
      created_at,
      updated_at,
    } = userData;

    try {

      const result = await prisma.$transaction(async (trx: PrismaClient) => {
        // inserting Users Table
        const users = await trx.users.create({
          data: {
            organization_id,
            first_name,
            last_name,
            email,
            phone,
            job_title,
            user_type
          }
        });

        
      })
 
      return ApiResult.success(
        {},
        "User registration successful"
      );
    } catch (error) {
      console.error("User registration error:", error);
      return ApiResult.error("User registration failed", 500);
    }
  }

  // GET User API
  public async getUser(data: IIDModel): Promise<ApiResult> {
    const { id } = data;

    try {
      const user = await prisma.users.findUnique({
        where: {
          id: BigInt(id),
        },
      });

      if (!user) {
        return ApiResult.error("User not found", 404);
      }

      const result = await stringifyBigInts(user);
      return ApiResult.success(result, "Successfully fetched user");
    } catch (error) {
      return ApiResult.error("Failed to fetch user data", 500);
    }
  }

  // Update User API
  public async updateUser(data: IEditUser): Promise<ApiResult> {
    const {
      id,
      first_name,
      last_name,
      organization_id,
      isVerified_Email,
      isVerified_PhoneNumber,
      email,
      phone,
      job_title,
      user_type,
      is_active,
      email_verified,
      created_at,
      updated_at,
    } = data;

    try {
      const result = await prisma.$transaction(async (trx: any) => {
        const org = await trx.users.updateMany({
          where: {
            id: Number(id),
          },
          data: {
            first_name,
            last_name,
            organization_id: Number(organization_id),
            isVerified_Email,
            isVerified_PhoneNumber,
            email,
            phone,
            job_title,
            user_type,
            is_active,
            email_verified,
            created_at,
            updated_at,
          },
        });

        return ApiResult.success({ result: org }, "Successfully updated user");
      });

      return result;
    } catch (error: any) {
      console.log("updateuser error", error);

      return ApiResult.error(error.message || "Failed to update user", 500);
    }
  }

  // Delete User API
  public async deleteUser(data: {id: IIDModel;}): Promise<ApiResult> {
    const { id } = data;
    try {
      await prisma.$transaction(async (trx: any) => {
        return await trx.users.delete({
          where: {
            id: Number(id),
          },
        });
      });
      return ApiResult.success({}, "User deleted successful");
    } catch (error) {
      return ApiResult.error("Failed to delete user", 500);
    }
  }

  //User Profile API
  public async getUserProfiles(): Promise<ApiResult> {
    try {
      const users = await prisma.users.findMany();
  
      const result = await stringifyBigInts(users); // Optional, if you're handling BigInts
      console.log('users', users);
      
  
      return ApiResult.success(result, "Successfully fetched all user profiles", 200);
    } catch (error: any) {
      return ApiResult.error("Failed to fetch user profiles", 500);
    }
  }

  // Get All Users API
   public async getAllUser(data: any): Promise<ApiResult> {

    const { user_type, organization_id } = data;

    try {
      const user = await prisma.users.findMany({
        where: {
          user_type,
          organization_id
        },
      });

      console.log("user", user);
      

      if (!user) {
        return ApiResult.error("User not found", 404);
      }

      const result = await stringifyBigInts(user);
      return ApiResult.success(result, "Successfully fetched user", 200);
    } catch (error) {
      return ApiResult.error("Failed to fetch user data", 500);
    }
  }
}  
