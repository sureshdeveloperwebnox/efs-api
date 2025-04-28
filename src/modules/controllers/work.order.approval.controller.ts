import { AccessTokenGuard } from "../../middlewares";
import { GET, POST, PUT, Validate, POSTPayloadDecorator, Controller, PUTPayloadDecorator, GETPayloadDecorator } from "../../decorators";
import { WorkOrderApproval } from "../services";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { ValidateDateTime, ValidateParamsID, WorkOrderApprovalValidation, CreateWorkOrderApprovalValidation } from "../rules";

// Work Order Approvals Controller API 

@Controller("/work-order-approval")
export class WorkOrderApprovalController {
  private work_order_approvals!: WorkOrderApproval;

  constructor() {
    this.work_order_approvals = new WorkOrderApproval();
  }

  // Create Work Order Approval API 
  @POST("")
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  @Validate([CreateWorkOrderApprovalValidation, ValidateDateTime])
  public async createWorkOrderApproval(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.work_order_approvals.createWorkOrderApproval(data);
      result.send(res);
    } catch (error: any) {
      console.log("createWorkOrderApproval Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Work Order Approval API
  @PUT("/:id")
  @Validate([ValidateParamsID, ValidateDateTime, WorkOrderApprovalValidation])
  @AccessTokenGuard()
  @PUTPayloadDecorator()
  public async workOrderApproval(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.work_order_approvals.workOrderApproval(data);
      result.send(res);
    } catch (error: any) {
      console.log("workOrderApproval Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

}
