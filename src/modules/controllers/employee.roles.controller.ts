import { Controller, GET, GETALLPayloadDecorator, GETPayloadDecorator, POST, POSTPayloadDecorator, PUT, PUTPayloadDecorator } from "../../decorators";
import { EmployeeRole } from "../services"
import { AccessTokenGuard } from "../../middlewares";
import { ApiResult } from "../../utils/api-result";

@Controller("/employee-role")
export class EmployeeRoleController {
    private employeerole !: EmployeeRole
    constructor() {
        this.employeerole = new EmployeeRole();
    }

    // create Employee Role API 
    @POST('')
    @POSTPayloadDecorator()
    @AccessTokenGuard()
    public async createEmployeeRole(req: Request, res: Response, data: any): Promise<void> {
        try {
            console.log("EMPLOYEE ROLE DATA :\n",data);
            const result = await this.employeerole.createEmployeeRole(data);
            result.send(res);
        } catch (error: any) {
            console.log("createEmployeeRole Error", error);
            ApiResult.error(error.message || "Internal server error", 500);
        }
    };

    // update Employee Role API
    @PUT('/:id')
    @PUTPayloadDecorator()
    @AccessTokenGuard()
    public async updateEmployeeRole(req: Request, res: Response, data: any): Promise<void> {
        try {
            const result = await this.employeerole.updateEmployeeRole(data);
            result.send(res);
        } catch (error: any) {
            console.log("updateEmployeeRole Error", error);
            ApiResult.error(error.message || "Internal server error", 500);
        }
    };


    @GET('/:id')
    @GETPayloadDecorator()
    @AccessTokenGuard()
    public async getEmployeeRole(req: Request, res: Response, data: any): Promise<void> {
        try {
            const result = await this.employeerole.getEmployeeRole(data);
            result.send(res);
        } catch (error: any) {
            console.log("getEmployeeRole Error", error);
            ApiResult.error(error.message || "Internal server error", 500);
        }
    };


    @POST('/getAllEmployeeRole')
    @GETALLPayloadDecorator()
    @AccessTokenGuard()
    public async getAllEmployeeRole(req: Request, res: Response, data: any): Promise<void> {
        try {
            const result = await this.employeerole.getAllEmployeeRole(data);
            result.send(res);
        } catch (error: any) {
            console.log("getAllEmployeeRole Error", error);
            ApiResult.error(error.message || "Internal server error", 500);
        }
    };
}