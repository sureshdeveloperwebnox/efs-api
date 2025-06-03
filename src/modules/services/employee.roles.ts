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
            is_active,
            date_time
        } = data;
        try {

            await prisma.$transaction(async (trx: PrismaClient) => {
                await trx.employee_role.create({
                    data: {
                        organization_id,
                        name,
                        is_active: 1,
                        created_at: date_time
                    }
                });
            });

            return ApiResult.success({}, "Employee role created successful", 201)

        } catch (error: any) {
            console.log("createEmployeeRole Error", error);
            return ApiResult.error("Failed to create employee role", 500)
        }
    };

    public async updateEmployeeRole(data: any): Promise<ApiResult> {
        const {
            id,
            organization_id,
            name,
            date_time
        } = data;
        try {

            await prisma.$transaction(async (trx: PrismaClient) => {

                // update employee role table
                await trx.employee_role.updateMany({
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

            return ApiResult.success({}, "Employee updated successful", 202)

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

    public async toggleEmployeeRoleStatus(data: { id: number; is_active: number }): Promise<ApiResult> {
        try {
            const role = await prisma.employee_role.findUnique({
                where: { id: data.id},
                select: { is_active: true }
            });

            if (!role) {
                return ApiResult.error("Employee role not found", 404);
            }

            const updatedStatus = role.is_active === 1 ? 0 : 1;

            const result = await prisma.$transaction(async (trx: PrismaClient) => {
               const temp =  await trx.employee_role.update({
                    where: { id: data.id },
                    data: { is_active: updatedStatus, updated_at : new Date().toDateString() }
                });
                console.log("result>>>>>>>>>>",temp);
                return temp;
            });

            console.log("result::::::::::::",result);



            const formattedResult = await stringifyBigInts(result);

            return ApiResult.success( result, "Employee role status updated successfully", 200);
        } catch (error: any) {
            console.log("toggleEmployeeRoleStatus Error", error);
            return ApiResult.error("Failed to update employee role status", 500);
        }
    }
}