import { AccessTokenGuard } from "../../middlewares";
import { GET, POST, PUT, Validate, POSTPayloadDecorator, Controller, PUTPayloadDecorator, GETPayloadDecorator } from "../../decorators";
import { Parts } from "../services";
import { getDateTime } from "../../utils/get.date.time";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { CreatePartValidation, ValidateDateTime, ValidateParamsID } from "../rules";

// Part API 
@Controller("/parts")
export class PartController {
  private parts!: Parts;

  constructor() {
    this.parts = new Parts();
  }

  // Create Part API Endpoint
  @POST("")
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  @Validate([CreatePartValidation, ValidateDateTime])
  public async createPart(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.parts.createPart(data);
      result.send(res);
    } catch (error: any) {
      console.log("createPart Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // GET Part By ID API
  @GET("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID])
  @GETPayloadDecorator()
  public async getPartByID(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.parts.getPartByID(data);
      result.send(res);
    } catch (error: any) {
      console.log("getPartByID Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Update Part API
  @PUT("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID])
  @PUTPayloadDecorator()
  public async updateCustomer(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.parts.updatePart(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateCustomer Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }
}
