import { AccessTokenGuard } from "../../middlewares";
import { GET, POST, PUT, Validate, POSTPayloadDecorator, Controller, PUTPayloadDecorator, GETPayloadDecorator } from "../../decorators";
import { WorkOrderCrew } from "../services";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { CreateWorkOrderCrewValidation, UpdateWorkOrderCrewValidation, ValidateDateTime, ValidateParamsID } from "../rules";

// Work Order Crew Controller API 

@Controller("/work-order-crew")
export class WorkOrderCrewController {
  private work_order_crew!: WorkOrderCrew;

  constructor() {
    this.work_order_crew = new WorkOrderCrew();
  }

  // Create Work Order Crew API 
  @POST("")
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  @Validate([CreateWorkOrderCrewValidation, ValidateDateTime])
  public async createWorkOrderCrew(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.work_order_crew.createWorkOrderCrew(data);
      result.send(res);
    } catch (error: any) {
      console.log("createWorkOrderCrew Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // GET Work Order Crew API
  @GET("/:id")
  @Validate([ValidateParamsID])
  @AccessTokenGuard()
  @GETPayloadDecorator()
  public async getWorkOrderCrew(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.work_order_crew.getWorkOrderCrew(data);
      result.send(res);
    } catch (error: any) {
      console.log("getWorkOrderCrew Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Update Work Order Crew API
  @PUT("/:id")
  @Validate([ValidateParamsID, ValidateDateTime, UpdateWorkOrderCrewValidation])
  @AccessTokenGuard()
  @PUTPayloadDecorator()
  public async updateWorkOrderCrew(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.work_order_crew.updateWorkOrderCrew(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateWorkOrderCrew Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

}
