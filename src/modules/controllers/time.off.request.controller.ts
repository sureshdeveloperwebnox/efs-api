import { Controller, GET, POST, PUT, Validate } from "../../decorators";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import {
  CreateTimeoffRequestValidationSchema,
  UpdateTimeoffRequestValidationSchema,
  ValidateParamsID,
} from "../rules";
import { AccessTokenGuard } from "../../middlewares/token.guard";
import { TimeOffRequest } from "../services/time.off.request";

// Time Off Request Controller
@Controller("/time-off-requests")
export class TimeOffRequestController {
  private timeoffrequest!: TimeOffRequest;

  constructor() {
    this.timeoffrequest = new TimeOffRequest();
  }

  // CREATE Time Off Request API
  @POST("")
  @Validate({body: CreateTimeoffRequestValidationSchema})
  @AccessTokenGuard()
  public async createTimeOffRequest(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.timeoffrequest.createTimeOffRequest(req.body);
      result.send(res);
    } catch (error: any) {
      console.log('createTimeOffRequest error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // GET Time Off Request By ID API
  @GET("/:id")
  @Validate({params: ValidateParamsID})
  @AccessTokenGuard()
  public async getTimeOffRequestByID(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const body = req.body;

      const data = { ...body, id };

      const result = await this.timeoffrequest.getTimeOffRequestByID(data);
      result.send(res);
    } catch (error: any) {
      console.log('getTimeOffRequestByID error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // PUT Update Time Off Request Approve or Reject API
  @PUT("/updateTimeOffRequest/:id")
  @Validate({params: ValidateParamsID, body: UpdateTimeoffRequestValidationSchema})
  @AccessTokenGuard()
  public async updateTimeOffRequest(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const body = req.body;

      const data = { ...body, id };

      const result = await this.timeoffrequest.updateTimeOffRequest(data);
      result.send(res);
    } catch (error: any) {
      console.log('updateTimeOffRequest error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }
}
