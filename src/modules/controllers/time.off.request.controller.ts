import { Controller, GET, POST, PUT, Validate } from "../../decorators";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { TimeoffRequestValidationSchema, UpdateTimeoffRequestValidationSchema, userParams } from "../rules";
import { AccessTokenGuard } from "../../middlewares/token.guard";
import { TimeOffRequest } from "../services/time.off.request";

@Controller("/time-off-requests")
export class TimeOffRequestController {
  private timeoffrequest!: TimeOffRequest;

  constructor() {
    this.timeoffrequest = new TimeOffRequest();
  }

  // CREATE Time Off Request API
  @POST("")
  @Validate([TimeoffRequestValidationSchema])
  @AccessTokenGuard()
  public async createTimeOffRequest(
    req: RequestX,
    res: Response
  ): Promise<void> {
    try {
      const result = await this.timeoffrequest.createTimeOffRequest(req.body);
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 500);
    }
  }

  // GET Time Off Request By ID
  @GET("/:id")
  @Validate([userParams])
  @AccessTokenGuard()
  public async getTimeOffRequestByID(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const body = req.body;

      const data = { ...body, id };

      const result = await this.timeoffrequest.getTimeOffRequestByID(data);
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 500);
    }
  }



    // PUT Update Time Off Request Approve or Reject
    @PUT("/updateTimeOffRequest/:id")
    @Validate([userParams, UpdateTimeoffRequestValidationSchema])
    @AccessTokenGuard()
    public async updateTimeOffRequest(req: RequestX, res: Response): Promise<void> {
      try {
        const id = req.params.id;
  
        const body = req.body;
  
        const data = { ...body, id };
  
        const result = await this.timeoffrequest.updateTimeOffRequest(data);
        result.send(res);
      } catch (error: any) {
        ApiResult.error(error.message, 500);
      }
    }
}
