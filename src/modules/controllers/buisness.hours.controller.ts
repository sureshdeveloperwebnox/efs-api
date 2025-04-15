import { Controller, GET, POST } from "../../decorators";
import { BusinessHours } from "../services/business.hours";
import { RequestX } from "../../utils/request.interface";
import { ApiResult } from "../../utils/api-result";

@Controller("/business-hours")
export class BusinessHoursController {
  private businesshours!: BusinessHours;

  constructor() {
    this.businesshours = new BusinessHours();
  }

  @POST("")
  public async createBusinessHours(
    req: RequestX,
    res: Response
  ): Promise<void> {
    try {
      const result = await this.businesshours.createBusinessHours(req.body);
      result.send(res);
    } catch (error: any) {
      const message = error instanceof Error ? error.message : "Unknown error";
      ApiResult.error(message, 400).send(res);
    }
  }

  @GET("/:id")
  public async getBusinessHoursByID(
    req: RequestX,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.businesshours.getBusinessHoursByID({
        id: id,
      });
      result.send(res);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      ApiResult.error(message, 400).send(res);
    }
  }
  @GET("/getBusinessHours")
  public async getBusinessHours(
    req: RequestX,
    res: Response
  ): Promise<void> {
    try {
      const result = await this.businesshours.getBusinessHours();
      result.send(res);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      ApiResult.error(message, 400).send(res);
    }
  }
}
