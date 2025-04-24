import { AccessTokenGuard } from "../../middlewares";
import { GET, POST, PUT, Validate, POSTPayloadDecorator, Controller, PUTPayloadDecorator, GETPayloadDecorator } from "../../decorators";
import { ServiceTypes } from "../services";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { CreateServiceTypeValidation, UpdateServiceTypeValidation, ValidateDateTime, ValidateParamsID } from "../rules";

// Service Type Controller API 

@Controller("/servicetypes")
export class ServiceTypeController {
  private servicetypes!: ServiceTypes;

  constructor() {
    this.servicetypes = new ServiceTypes();
  }

  // Create Service Type API 
  @POST("")
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  @Validate([CreateServiceTypeValidation, ValidateDateTime])
  public async createServiceType(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.servicetypes.createServiceType(data);
      result.send(res);
    } catch (error: any) {
      console.log("createServiceType Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // GET Service Type By ID API
  @GET("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID])
  @GETPayloadDecorator()
  public async getServiceType(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.servicetypes.getServiceType(data);
      result.send(res);
    } catch (error: any) {
      console.log("getServiceType Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Update Service Type API
  @PUT("/:id")
  @Validate([ValidateParamsID, ValidateDateTime, UpdateServiceTypeValidation])
  // @AccessTokenGuard()
  @PUTPayloadDecorator()
  public async updateServiceType(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.servicetypes.updateServiceType(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateServiceType Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }
}
