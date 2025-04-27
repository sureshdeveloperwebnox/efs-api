import { Controller, GET, GETPayloadDecorator, POST, POSTPayloadDecorator, Validate } from "../../decorators";
import { BusinessHours } from "../services/business.hours";
import { RequestX } from "../../utils/request.interface";
import { ApiResult } from "../../utils/api-result";
import { CreateBusinessHoursValidation, ValidateParamsID } from "../rules";
import { AccessTokenGuard } from "../../middlewares";

// Business Hours Controller
@Controller("/business-hours")
export class BusinessHoursController {
  private businesshours!: BusinessHours;

  constructor() {
    this.businesshours = new BusinessHours();
  }
  // Create Business Hours API
  @POST("")
  @Validate([CreateBusinessHoursValidation])
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  public async createBusinessHours(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.businesshours.createBusinessHours(data);
      result.send(res);
    } catch (error: any) {
      console.log('createBusinessHours error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }
  // Get Business Hours API
  @GET("/:id")
  @Validate([ValidateParamsID])
  @AccessTokenGuard()
  @GETPayloadDecorator()
  public async getBusinessHour(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.businesshours.getBusinessHour(data);
      result.send(res);
    } catch (error: any) {
      console.log('getBusinessHour error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Get All Business Hour API
  @POST("/getAllBusinessHour")
  @AccessTokenGuard()
  public async getAllBusinessHour(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.businesshours.getAllBusinessHour();
      result.send(res);
    } catch (error: any) {
      console.log('getAllBusinessHour error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }
}
