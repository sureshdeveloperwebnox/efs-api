import { Controller, GET, POST, Validate } from "../../decorators";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { CreateHolidayValidationSchema, ValidateParamsID } from "../rules";
import { Holiday } from "../services/holiday";
import { AccessTokenGuard } from "../../middlewares/token.guard";

// Holiday Controller
@Controller("/holiday")
export class HolidaysController {
  private holiday!: Holiday;

  constructor() {
    this.holiday = new Holiday();
  }

  // CREATE Holiday API
  @POST("")
  @Validate([CreateHolidayValidationSchema])
  @AccessTokenGuard()
  public async createHoliday(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.holiday.createHoliday(req.body);
      result.send(res);
    } catch (error: any) {
      console.log('createHoliday error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // GET Holiday By ID
  @GET("/:id")
  @Validate([ValidateParamsID])
  @AccessTokenGuard()
  public async getHolidayByID(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const body = req.body;

      const data = { ...body, id };

      const result = await this.holiday.getHolidayByID(data);
      result.send(res);
    } catch (error: any) {
      console.log('getHolidayByID error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // DELETE Holiday
  @GET("/:id")
  @Validate([ValidateParamsID])
  @AccessTokenGuard()
  public async deleteHoliday(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const body = req.body;

      const data = { ...body, id };

      const result = await this.holiday.deleteHoliday(data);
      result.send(res);
    } catch (error: any) {
      console.log('deleteHoliday error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }
}
