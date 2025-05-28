import { ApiResult } from "../../utils/api-result";
import prisma from "../../config/db";
import { stringifyBigInts } from "../../middlewares";
import { PrismaClient } from "@prisma/client";
import { IIDModel } from "../model";
import { getHashPassword } from "../../utils";

export class Employee {
    public async createEmployee(data: any): Promise<ApiResult> {
        const {
            organization_id,
            first_name,
            last_name,
            email,
            phone,
            password,
            job_title,
            employee_role_id,
            gender,
            address,
            city,
            state,
            country,
            pincode,
            skill,
            experience_years,
            date_time
        } = data;
        try {
             const { hashedPassword } = await getHashPassword(password);

            await prisma.$transaction(async (trx: PrismaClient) => {
                
                const users = await trx.users.create({
                    data: {
                        organization_id,
                        first_name,
                        last_name,
                        email,
                        phone,
                        password_hash: hashedPassword,
                        job_title,
                        user_type: "EMPLOYEE",
                        created_at: date_time
                    }
                });

                await trx.employee.create({
                    data: {
                        user_id: users.id,
                        organization_id,
                        employee_role_id,
                        gender,
                        address,
                        city,
                        state,
                        country,
                        pincode,
                        skill,
                        experience_years,
                        created_at: date_time
                    }
                })
            });

            return ApiResult.success({}, "Employee created successful", 201)

        } catch (error: any) {
            console.log("createEmployee Error", error);
            return ApiResult.error("Failed to create employee", 500)
        }
    };

    public async updateEmployee(data: any): Promise<ApiResult> {
        const {
            id,
            user_id,
            organization_id,
            first_name,
            last_name,
            email,
            phone,
            job_title,
            employee_role_id,
            gender,
            address,
            city,
            state,
            country,
            pincode,
            skill,
            experience_years,
            date_time
        } = data;
        try {

            await prisma.$transaction(async (trx: PrismaClient) => {

                // update users table
                await trx.users.updateMany({
                    data: {
                        first_name,
                        last_name,
                        email,
                        phone,
                        job_title,
                        user_type: "EMPLOYEE",
                        updated_at: date_time
                    },
                    where: {
                        id: user_id,
                        organization_id
                    }
                });

                // update employee table
                await trx.employee.updateMany({
                    data: {
                        user_id: user_id,
                        organization_id,
                        employee_role_id,
                        gender,
                        address,
                        city,
                        state,
                        country,
                        pincode,
                        skill,
                        experience_years,
                        updated_at: date_time
                    },
                    where: {
                        id
                    }
                })
            });

            return ApiResult.success({}, "Employee updated successful", 202)

        } catch (error: any) {
            console.log("updateEmployee Error", error);
            return ApiResult.error("Failed to update employee", 500)
        }
    };

    public async getEmployee(data: IIDModel): Promise<ApiResult> {
        try {
            const result = await prisma.employee.findFirst({
                where: { id: BigInt(data.id) },
                include: {
                    employee_role: true,
                    users: true
                }
            });

            if (!result) {
                return ApiResult.success({}, "No data retrieved", 409);
            }

            // Convert BigInt values to string (if needed) without deep clone
            const formattedResult = await stringifyBigInts(result);

            return ApiResult.success(
                formattedResult,
                "Successfully fetched employees"
            );

        } catch (error: any) {
            console.log("getEmployee Error", error);
            return ApiResult.error("Failed to fetch employee data")
        }
    };

    public async getAllEmployee(data: any): Promise<ApiResult> {
        const { organization_id } = data;
        try {
            const result = await prisma.employee.findMany({
                where: { organization_id: BigInt(organization_id) },
                include: {
                    employee_role: true,
                    users: true
                }
            });

            if (!result) {
                return ApiResult.success({}, "No data retrieved", 409);
            }

            // Convert BigInt values to string (if needed) without deep clone
            const formattedResult = await stringifyBigInts(result);

            return ApiResult.success(
                formattedResult,
                "Successfully fetched employees"
            );



        } catch (error: any) {
            console.log("getAllEmployee Error", error);

        }
    };
}