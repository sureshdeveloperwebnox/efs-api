import { AccessTokenGuard } from "../../middlewares";
import { GET, POST, PUT, Validate, POSTPayloadDecorator, Controller, PUTPayloadDecorator, GETPayloadDecorator } from "../../decorators";
import { MaintenancePlanAsset } from "../services";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { CreateMaintenancePlanAssetValidation, UpdateMaintenancePlanAssetValidation, ValidateDateTime, ValidateParamsID } from "../rules";

// Maintenance Plan Asset API Controller

@Controller("/maintenance_plan_asset")
export class MaintenancePlanAssetController {
  private maintenance_plan_asset!: MaintenancePlanAsset;

  constructor() {
    this.maintenance_plan_asset = new MaintenancePlanAsset();
  }

  // Create Maintenance Plan Asset API 
  @POST("")
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  @Validate([CreateMaintenancePlanAssetValidation, ValidateDateTime])
  public async createMaintenancePlanAsset(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.maintenance_plan_asset.createMaintenancePlanAsset(data);
      result.send(res);
    } catch (error: any) {
      console.log("createMaintenancePlanAsset Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // Get Maintenance Plan Asset API
  @GET("/:id")
  @Validate([ValidateParamsID])
  @AccessTokenGuard()
  @GETPayloadDecorator()
  public async getMaintenancePlanAsset(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.maintenance_plan_asset.getMaintenancePlanAsset(data);
      result.send(res);
    } catch (error: any) {
      console.log("getMaintenancePlanAsset Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // Update Maintenance Plan Asset API
  @PUT("/:id")
  @Validate([ValidateParamsID, ValidateDateTime, UpdateMaintenancePlanAssetValidation])
  @AccessTokenGuard()
  @PUTPayloadDecorator()
  public async updateMaintenancePlanAsset(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.maintenance_plan_asset.updateMaintenancePlanAsset(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateMaintenancePlanAsset Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };
}
