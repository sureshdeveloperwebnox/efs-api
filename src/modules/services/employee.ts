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
            const IsUserExists = await prisma.users.findUnique({
                where: { email }
            })

            if (IsUserExists === null) {
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
                        id: employee.id,
                        user_id: users.id,
                        organization_id: users.organization_id,
                        is_active: users.is_active, first_name: users.first_name,
                        last_name: users.last_name, email: users.email, phone: users.phone,
                        job_title: users.job_title, employee_role_id: employee.employee_role_id,
                        gender: employee.gender, address: employee.address, city: employee.city,
                        state: employee.state, country: employee.country, pincode: employee.pincode,
                        experience_years: employee.experience_years, skill: employee.skill,
                        created_at: employee.created_at, updated_at: employee.updated_at
                    };

                    return response;
                });
                const formattedResult = await stringifyBigInts(result);
                return ApiResult.success(formattedResult, "Employee created successfully", 201);
            } else {
                return ApiResult.error("User Already Found : ",400);
            }

        } catch (error: any) {
            console.error("createEmployee Error", error);
            return ApiResult.error("Failed to create employee>>>>" + error, 500);
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
                const userResponse = await trx.users.updateMany({
                    data: {
                        first_name, last_name, email, phone, job_title,
                        user_type: "EMPLOYEE", updated_at: date_time
                    },
                    where: { id: user_id, organization_id }
                });

                const employeeResponse = await trx.employee.updateMany({
                    data: {
                        user_id, organization_id, employee_role_id, gender,
                        address, city, state, country, pincode, skill,
                        experience_years, updated_at: date_time
                    },
                    where: { id }
                });

                if (!userResponse || !employeeResponse) {
                    return ApiResult.success({}, "No data retrieved", 409)
                }
            });

            const structuredResult = {
                id,
                user_id: user_id,
                organization_id: organization_id,
                first_name, last_name, email, phone,
                job_title, employee_role_id: employee_role_id,
                gender, address, city, state, country,
                pincode, skill, experience_years, updated_at: date_time
            }

            const formattedResult = await stringifyBigInts(structuredResult);

            return ApiResult.success(formattedResult, "Employee updated successfully", 202);
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

            const structuredResult = {
                id: response.id,
                user_id: response.users.id,
                organization_id: response.organization_id,
                is_active: response.users.is_active, first_name: response.users.first_name,
                last_name: response.users.last_name, email: response.users.email, phone: response.users.phone,
                job_title: response.users.job_title, employee_role_id: response.employee_role.id,
                gender: response.gender, address: response.address, city: response.city,
                state: response.state, country: response.country, pincode: response.pincode,
                experience_years: response.experience_years, skill: response.skill,
                created_at: response.created_at, updated_at: response.updated_at
            };

            const formattedResult = await stringifyBigInts(structuredResult)

            return ApiResult.success(formattedResult, "Successfully fetched employee", 200);
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


            const structuredResult = result.map(response => ({
                id: response.id,
                user_id: response.users.id,
                organization_id: response.organization_id,
                is_active: response.users.is_active, first_name: response.users.first_name,
                last_name: response.users.last_name, email: response.users.email, phone: response.users.phone,
                job_title: response.users.job_title, employee_role_id: response.employee_role.id,
                gender: response.gender, address: response.address, city: response.city,
                state: response.state, country: response.country, pincode: response.pincode,
                experience_years: response.experience_years, skill: response.skill,
                created_at: response.created_at, updated_at: response.updated_at
            }));

            const formattedResult = await stringifyBigInts(structuredResult)

            return ApiResult.success(formattedResult, "Successfully fetched employees", 200);
        } catch (error: any) {
            console.error("getAllEmployee Error", error);
            return ApiResult.error("Failed to fetch employee data", 500);
        }
    }

    public async toggleEmployeeStatus(data: any): Promise<ApiResult> {
        const {
            id,
            is_active,
            date_time
        } = data;
        try {
            const result = await prisma.users.updateMany({
                where: { id },
                data: { is_active, updated_at: date_time }
            }
            );

            if (!result) {
                return ApiResult.error("Employee role not update", 401);
            }
            const formattedResult = await stringifyBigInts(result);
            return ApiResult.success(formattedResult, "Employee status updated successfully", 200);

        } catch (error: any) {
            console.log("toggleEmployeeStatus Error", error);
            return ApiResult.error("Failed to update employee status", 500);
        }
    }
}
