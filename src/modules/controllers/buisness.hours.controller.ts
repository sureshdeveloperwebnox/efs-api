import { Controller, GET, POST } from "../../decorators";
import { BusinessHours } from "../services/business.hours";
import { RequestX } from "../../utils/request.interface";
import { ApiResult } from "../../utils/api-result";

// Business Hours Controller
@Controller("/business-hours")
export class BusinessHoursController {
  private businesshours!: BusinessHours;

  constructor() {
    this.businesshours = new BusinessHours();
  }
  // Create Business Hours API
  @POST("")
  public async createBusinessHours(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.businesshours.createBusinessHours(req.body);
      result.send(res);
    } catch (error: any) {
      console.log('createBusinessHours error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }
  // Get Business Hours API
  @GET("/:id")
  public async getBusinessHoursByID(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.businesshours.getBusinessHoursByID({
        id: id,
      });
      result.send(res);
    } catch (error: any) {
      console.log('getBusinessHoursByID error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Get Business Hours API
  @GET("/getBusinessHours")
  public async getBusinessHours(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.businesshours.getBusinessHours();
      result.send(res);
    } catch (error: any) {
      console.log('getBusinessHours error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }
}
