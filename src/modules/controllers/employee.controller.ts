import { Controller, GET, GETALLPayloadDecorator, GETPayloadDecorator, POST, POSTPayloadDecorator, PUT, PUTPayloadDecorator } from "../../decorators";
import { Employee } from "../services"
import { AccessTokenGuard } from "../../middlewares";
import { ApiResult } from "../../utils/api-result";

@Controller("/employee")
export class EmployeeController {
    private employee !: Employee
    constructor() {
        this.employee = new Employee();
    }

    // create Employee API 
    @POST('')
    @POSTPayloadDecorator()
    @AccessTokenGuard()
    public async createEmployee(req: Request, res: Response, data: any): Promise<void> {
        try {
            const result = await this.employee.createEmployee(data);
            result.send(res); 
        } catch (error: any) {
            console.log("createEmployee Error", error);
            ApiResult.error(error.message || "Internal server error", 500);
        }
    };

    // update Employee API
    @PUT('/:id')
    @PUTPayloadDecorator()
    @AccessTokenGuard()
    public async updateEmployee(req: Request, res: Response, data: any): Promise<void> {
        try {
            const result = await this.employee.updateEmployee(data);
            result.send(res);
        } catch (error: any) {
            console.log("updateEmployee Error", error);
            ApiResult.error(error.message || "Internal server error", 500);
        }
    };

    // get Employee API
    @GET('/:id')
    @GETPayloadDecorator()
    @AccessTokenGuard()
    public async getEmployee(req: Request, res: Response, data: any): Promise<void> {
        try {
            const result = await this.employee.getEmployee(data);
            result.send(res);
        } catch (error: any) {
            console.log("getEmployee Error", error);
            ApiResult.error(error.message || "Internal server error", 500);
        }
    };

    // get all Employee API
    @POST('/getAllEmployee')
    @GETALLPayloadDecorator()
    @AccessTokenGuard()
    public async getAllEmployee(req: Request, res: Response, data: any): Promise<void> {
        try {
            const result = await this.employee.getAllEmployee(data);
            result.send(res);
        } catch (error: any) {
            console.log("getAllEmployee Error", error);
            ApiResult.error(error.message || "Internal server error", 500);
        }
    };
}