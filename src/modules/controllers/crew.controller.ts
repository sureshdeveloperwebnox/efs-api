import { Controller, GET, POST, PUT, Validate } from "../../decorators";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { AccessTokenGuard } from "../../middlewares/token.guard";
import { Crew } from "../services/crews";
import { CreateCrewValidation, ValidateParamsID } from "../rules";

// Crew Controller

@Controller("/crew")
export class CrewController {
  private crew!: Crew;

  constructor() {
    this.crew = new Crew();
  }

  // Create Crew API
  @POST("")
  @AccessTokenGuard()
  @Validate([CreateCrewValidation])
  public async createCrew(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.crew.createCrew(req.body);
      result.send(res);
    } catch (error: any) {
      console.log("createCrew Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // GET Crew By ID API
  @GET("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID])
  public async getCrewByID(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id

      const body = req.body;

      const data = { ...body, id }

      const result = await this.crew.getCrewByID(data);
      result.send(res);
    } catch (error: any) {
      console.log("getCrewByID Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };
}
