import { Controller, GET, POST, Validate } from "../../decorators";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { holidayValidationSchema, userParams } from "../rules";
import { Holiday } from "../services/holiday";
import { AccessTokenGuard } from "../../middlewares/token.guard";

@Controller("/holiday")
export class HolidaysController {
  private holiday!: Holiday;

  constructor() {
    this.holiday = new Holiday();
  }

  // CREATE Holiday API
  @POST("")
  @Validate([holidayValidationSchema])
  @AccessTokenGuard()
  public async createHoliday(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.holiday.createHoliday(req.body);
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 500);
    }
  }

  // GET Holiday By ID
  @GET("/:id")
  @Validate([userParams])
  @AccessTokenGuard()
  public async getHolidayByID(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const body = req.body;

      const data = { ...body, id };

      const result = await this.holiday.getHolidayByID(data);
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 500);
    }
  }

  // DELETE Holiday
  @GET("/:id")
  @Validate([userParams])
  @AccessTokenGuard()
  public async deleteHoliday(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const body = req.body;

      const data = { ...body, id };

      const result = await this.holiday.deleteHoliday(data);
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 500);
    }
  }
}
