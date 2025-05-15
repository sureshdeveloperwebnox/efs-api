import { AccessTokenGuard } from "../../middlewares";
import { GET, POST, PUT, Validate, POSTPayloadDecorator, Controller, PUTPayloadDecorator, GETPayloadDecorator } from "../../decorators";
import { WorkOrder } from "../services";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { CreateWorkOrderValidation, UpdateWorkOrderValidation, ValidateDateTime, ValidateParamsID } from "../rules";

// Work Order API Controller

@Controller("/work-order")
export class WorkOrderController {
  private work_order!: WorkOrder;

  constructor() {
    this.work_order = new WorkOrder();
  }

  // Create Work Order API 
  @POST("")
  @Validate([CreateWorkOrderValidation, ValidateDateTime])
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  public async createWorkOrder(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.work_order.createWorkOrder(data);
      result.send(res);
    } catch (error: any) {
      console.log("createWorkOrder Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // Get Work Order API
  @GET("/:id")
  @Validate([ValidateParamsID])
  @AccessTokenGuard()
  @GETPayloadDecorator()
  public async getWorkOrder(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.work_order.getWorkOrder(data);
      result.send(res);
    } catch (error: any) {
      console.log("getWorkOrder Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // Update Work Order API
  @PUT("/:id")
  @Validate([ValidateParamsID, ValidateDateTime, UpdateWorkOrderValidation])
  @AccessTokenGuard()
  @PUTPayloadDecorator()
  public async updateWorkOrder(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.work_order.updateWorkOrder(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateWorkOrder Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // Get Work Orders API
  @POST("/getAllOrder")
  @AccessTokenGuard()
  @GETPayloadDecorator()
  public async getAllWorkOrder(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.work_order.getAllWorkOrder();
      result.send(res);
    } catch (error: any) {
      console.log("getAllWorkOrder Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

}
