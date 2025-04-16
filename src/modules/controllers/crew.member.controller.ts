import { Controller, GET, POST, PUT, Validate } from "../../decorators";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { AccessTokenGuard } from "../../middlewares/token.guard";
import {  ValidateParamsID, CreateCrewMemberValidation } from "../rules";
import { CrewMember } from "../services";

// Crew Member Controller

@Controller("/crew-members")
export class CrewMemberController {
  private crewmember!: CrewMember;

  constructor() {
    this.crewmember = new CrewMember();
  }

  // Create Crew Memeber API
  @POST("")
  @AccessTokenGuard()
  @Validate([CreateCrewMemberValidation])
  public async createCrewMember(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.crewmember.createCrewMember(req.body);
      result.send(res);
    } catch (error: any) {
      console.log("createCrewMember Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // GET Crew Member By ID API
  @GET("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID])
  public async getCrewMemebrByID(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id

      const body = req.body;

      const data = { ...body, id }

      const result = await this.crewmember.getCrewMemebrByID(data);
      result.send(res);
    } catch (error: any) {
      console.log("getCrewMemebrByID Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };
}
