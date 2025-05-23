import { ApiResult } from "../../utils/api-result";
import prisma from "../../config/db";
import bcrypt from "bcrypt";
import { stringifyBigInts } from "../../middlewares";
import { ICreateUser, IEditUser, IIDModel } from "../model";

// User API Service
export class User {
  // User Register API
  public async register(userData: ICreateUser): Promise<ApiResult> {
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
      // Check if email already exists
      const existingEmail = await prisma.users.findFirst({
        where: { email },
      });

      if (existingEmail) {
        return ApiResult.error("Email is already registered.", 400);
      }

      // Check if phone already exists
      const existingPhone = await prisma.users.findFirst({
        where: { phone },
      });

      if (existingPhone) {
        return ApiResult.error("Phone number is already registered.", 400);
      }

      //password generation
      const salt = await bcrypt.genSalt(10);
      const password = Math.floor(Math.random() * 9000 + 1000).toString();

      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.$transaction(async (trx: any) => {
        return await trx.users.create({
          data: {
            first_name,
            organization_id: Number(organization_id),
            password_hash: hashedPassword,
            last_name,
            isVerified_Email,
            isVerified_PhoneNumber,
            email,
            phone,
            job_title,
            user_type: user_type,
            is_active,
            email_verified,
            created_at,
            updated_at,
          },
        });
      });

      return ApiResult.success(
        {
          user: {
            id: Number(user.id),
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          },
        },
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
