import { AccessTokenGuard } from "../../middlewares";
import { GET, POST, PUT, Validate, POSTPayloadDecorator, Controller, PUTPayloadDecorator, GETPayloadDecorator } from "../../decorators";
import { MaintenancePlan } from "../services";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { CreateServiceTypeValidation, UpdateServiceTypeValidation, ValidateDateTime, ValidateParamsID } from "../rules";

// Maintenance Plan API Controller

@Controller("/maintenance_plan")
export class MaintenancePlanController {
  private maintenance_plan!: MaintenancePlan;

  constructor() {
    this.maintenance_plan = new MaintenancePlan();
  }

  // Create Maintenance Plan API 
  @POST("")
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  @Validate([CreateServiceTypeValidation, ValidateDateTime])
  public async createMaintenancePlan(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.maintenance_plan.createMaintenancePlan(data);
      result.send(res);
    } catch (error: any) {
      console.log("createMaintenancePlan Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // Get Maintenance Plan API
  @GET("/:id")
  @Validate([ValidateParamsID])
  @AccessTokenGuard()
  @GETPayloadDecorator()
  public async getMaintenancePlan(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.maintenance_plan.getMaintenancePlan(data);
      result.send(res);
    } catch (error: any) {
      console.log("getMaintenancePlan Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // Update Maintenance Plan API
  @PUT("/:id")
  @Validate([ValidateParamsID, ValidateDateTime, UpdateServiceTypeValidation])
  @AccessTokenGuard()
  @PUTPayloadDecorator()
  public async updateMaintenancePlan(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.maintenance_plan.updateMaintenancePlan(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateMaintenancePlan Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };
}
