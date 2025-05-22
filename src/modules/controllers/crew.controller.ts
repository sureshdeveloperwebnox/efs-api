import { Controller, GET, GETALLPayloadDecorator, GETPayloadDecorator, POST, POSTPayloadDecorator, PUT, Validate } from "../../decorators";
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
  @Validate([CreateCrewValidation])
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  public async createCrew(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.crew.createCrew(data);
      result.send(res);
    } catch (error: any) {
      console.log("createCrew Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // GET Crew API
  @GET("/:id")
  @Validate([ValidateParamsID])
  @AccessTokenGuard()
  @GETPayloadDecorator()
  public async getCrew(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.crew.getCrew(data);
      result.send(res);
    } catch (error: any) {
      console.log("getCrew Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };


  // Get All Crew API
  @POST("/getAllCrew")
  @AccessTokenGuard()
  @GETALLPayloadDecorator()
  public async getAllCrew(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.crew.getAllCrew(data);
      result.send(res);
    } catch (error: any) {
      console.log("getAllCrew Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };
}
