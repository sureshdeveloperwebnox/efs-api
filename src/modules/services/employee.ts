import { ApiResult } from "../../utils/api-result";
import prisma from "../../config/db";
import { stringifyBigInts } from "../../middlewares";
import { PrismaClient } from "@prisma/client";
import { IIDModel } from "../model";
import { getHashPassword } from "../../utils";

export class Employee {
    public async createEmployee(data: any): Promise<ApiResult> {
        const {
            organization_id, first_name, last_name, email, phone, password,
            job_title, employee_role_id, gender, address, city, state,
            country, pincode, skill, experience_years, date_time
        } = data;

        try {
            const { hashedPassword } = await getHashPassword(password);

            const result = await prisma.$transaction(async (trx) => {
                const users = await trx.users.create({
                    data: {
                        organization_id, first_name, last_name, email, phone,
                        password_hash: hashedPassword, job_title, user_type: "EMPLOYEE",
                        created_at: date_time, is_active: 1
                    }
                });

                const employee = await trx.employee.create({
                    data: {
                        user_id: users.id, organization_id, employee_role_id, gender,
                        address, city, state, country, pincode, skill,
                        experience_years, created_at: date_time
                    }
                });

                const response = {
                    id: stringifyBigInts(employee.id),
                    user_id: stringifyBigInts(users.id),
                    organization_id: stringifyBigInts(users.organization_id),
                    is_active: users.is_active, first_name: users.first_name,
                    last_name: users.last_name, email: users.email, phone: users.phone,
                    job_title: users.job_title, employee_role_id: stringifyBigInts(employee.employee_role_id),
                    gender: employee.gender, address: employee.address, city: employee.city,
                    state: employee.state, country: employee.country, pincode: employee.pincode,
                    experience_years: employee.experience_years, skill: employee.skill,
                    created_at: employee.created_at, updated_at: employee.updated_at
                };

                return response;
            });

            return ApiResult.success(result, "Employee created successfully", 201);
        } catch (error: any) {
            console.error("createEmployee Error", error);
            return ApiResult.error("Failed to create employee", 500);
        }
    }

    public async updateEmployee(data: any): Promise<ApiResult> {
        const {
            id, user_id, organization_id, first_name, last_name, email,
            phone, job_title, employee_role_id, gender, address, city,
            state, country, pincode, skill, experience_years, date_time
        } = data;

        try {
            await prisma.$transaction(async (trx) => {
                await trx.users.updateMany({
                    data: {
                        first_name, last_name, email, phone, job_title,
                        user_type: "EMPLOYEE", updated_at: date_time
                    },
                    where: { id: user_id, organization_id }
                });

                await trx.employee.updateMany({
                    data: {
                        user_id, organization_id, employee_role_id, gender,
                        address, city, state, country, pincode, skill,
                        experience_years, updated_at: date_time
                    },
                    where: { id }
                });
            });

            return ApiResult.success({
                id: stringifyBigInts(id),
                user_id: stringifyBigInts(user_id),
                organization_id: stringifyBigInts(organization_id),
                first_name, last_name, email, phone,
                job_title, employee_role_id: stringifyBigInts(employee_role_id),
                gender, address, city, state, country,
                pincode, skill, experience_years, updated_at: date_time
            }, "Employee updated successfully", 202);
        } catch (error: any) {
            console.error("updateEmployee Error", error);
            return ApiResult.error("Failed to update employee", 500);
        }
    }

    public async getEmployee(data: IIDModel): Promise<ApiResult> {
        try {
            const response = await prisma.employee.findFirst({
                where: { id: BigInt(data.id) },
                include: { employee_role: true, users: true }
            });

            if (!response) return ApiResult.success({}, "No data retrieved", 409);

            const formattedResponse = {
                id: stringifyBigInts(response.id),
                user_id: stringifyBigInts(response.users.id),
                organization_id: stringifyBigInts(response.organization_id),
                is_active: response.users.is_active, first_name: response.users.first_name,
                last_name: response.users.last_name, email: response.users.email, phone: response.users.phone,
                job_title: response.users.job_title, employee_role_id: stringifyBigInts(response.employee_role.id),
                gender: response.gender, address: response.address, city: response.city,
                state: response.state, country: response.country, pincode: response.pincode,
                experience_years: response.experience_years, skill: response.skill,
                created_at: response.created_at, updated_at: response.updated_at
            };

            return ApiResult.success(formattedResponse, "Successfully fetched employee", 200);
        } catch (error: any) {
            console.error("getEmployee Error", error);
            return ApiResult.error("Failed to fetch employee data", 500);
        }
    }

    public async getAllEmployee(data: any): Promise<ApiResult> {
        try {
            const result = await prisma.employee.findMany({
                where: { organization_id: BigInt(data.organization_id) },
                include: { employee_role: true, users: true }
            });

            if (!result.length) return ApiResult.success({}, "No data retrieved", 409);

            const formattedResult = result.map(response => ({
                id: stringifyBigInts(response.id),
                user_id: stringifyBigInts(response.users.id),
                organization_id: stringifyBigInts(response.organization_id),
                is_active: response.users.is_active, first_name: response.users.first_name,
                last_name: response.users.last_name, email: response.users.email, phone: response.users.phone,
                job_title: response.users.job_title, employee_role_id: stringifyBigInts(response.employee_role.id),
                gender: response.gender, address: response.address, city: response.city,
                state: response.state, country: response.country, pincode: response.pincode,
                experience_years: response.experience_years, skill: response.skill,
                created_at: response.created_at, updated_at: response.updated_at
            }));

            return ApiResult.success(formattedResult, "Successfully fetched employees", 200);
        } catch (error: any) {
            console.error("getAllEmployee Error", error);
            return ApiResult.error("Failed to fetch employee data", 500);
        }
    }
}
