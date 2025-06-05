import { ApiResult } from "../../utils/api-result";
import prisma from "../../config/db";
import { stringifyBigInts } from "../../middlewares";
import { PrismaClient } from "@prisma/client";
import { IIDModel } from "../model";

export class EmployeeRole {
    public async createEmployeeRole(data: any): Promise<ApiResult> {
        const {
            organization_id,
            name,
            date_time
        } = data;
        try {
            const response = await prisma.$transaction(async (trx: PrismaClient) => {
                return await trx.employee_role.create({
                    data: {
                        organization_id,
                        name,
                        is_active: 1,
                        created_at: date_time
                    }
                });
            });

            const formattedResult = await stringifyBigInts(response);
            console.log("CreateRole>>>",formattedResult);

            return ApiResult.success(formattedResult, "Employee role created successfully", 201);

        } catch (error: any) {
            console.log("createEmployeeRole Error", error);
            return ApiResult.error("Failed to create employee role", 500);
        }
    }


    public async updateEmployeeRole(data: any): Promise<ApiResult> {
        const {
            id,
            organization_id,
            name,
            date_time
        } = data;
        try {

            const response = await prisma.$transaction(async (trx: PrismaClient) => {

                // update employee role table
                return await trx.employee_role.updateMany({
                    data: {
                        name,
                        updated_at: date_time
                    },
                    where: {
                        id: id,
                        organization_id
                    }
                });

            });

            const formattedResult = await stringifyBigInts(response);

            return ApiResult.success(response, "Employee updated successful", 202)

        } catch (error: any) {
            console.log("updateEmployee Error", error);
            return ApiResult.error("Failed to update employee", 500)
        }
    };

    public async getEmployeeRole(data: IIDModel): Promise<ApiResult> {
        try {
            const result = await prisma.employee_role.findFirst({
                where: { id: BigInt(data.id) }
            });

            if (!result) {
                return ApiResult.success({}, "No data retrieved", 409);
            }

            // Convert BigInt values to string (if needed) without deep clone
            const formattedResult = await stringifyBigInts(result);

            return ApiResult.success(
                formattedResult,
                "Successfully fetched employees roles"
            );

        } catch (error: any) {
            console.log("getEmployeeRole Error", error);
            return ApiResult.error("Failed to fetch employee role data")
        }
    };

    public async getAllEmployeeRole(data: any): Promise<ApiResult> {
        const { organization_id } = data;
        try {
            const result = await prisma.employee_role.findMany({
                where: { organization_id: BigInt(organization_id) }
            });

            if (!result) {
                return ApiResult.success({}, "No data retrieved", 409);
            }

            // Convert BigInt values to string (if needed) without deep clone
            const formattedResult = await stringifyBigInts(result);

            return ApiResult.success(
                formattedResult,
                "Successfully fetched employee roles"
            );



        } catch (error: any) {
            console.log("getAllEmployeeRole Error", error);

        }
    };

    public async toggleEmployeeRoleStatus(data: any): Promise<ApiResult> {
        const {
            id,
            is_active,
            date_time
        } = data;
        try {
            const result = await prisma.employee_role.update({
                where: { id },
                data: { is_active, updated_at: date_time }
            }
            );

            if (!result) {
                return ApiResult.error("Employee role not update", 401);
            }
            const formattedResult = await stringifyBigInts(result);
            return ApiResult.success(formattedResult, "Employee role status updated successfully", 200);

        } catch (error: any) {
            console.log("toggleEmployeeRoleStatus Error", error);
            return ApiResult.error("Failed to update employee role status", 500);
        }
    }
}