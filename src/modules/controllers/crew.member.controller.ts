import { Controller, GET, GETALLPayloadDecorator, GETPayloadDecorator, POST, POSTPayloadDecorator, PUT, PUTPayloadDecorator, Validate } from "../../decorators";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { AccessTokenGuard } from "../../middlewares/token.guard";
import { ValidateParamsID, CreateCrewMemberValidation } from "../rules";
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
  @Validate([CreateCrewMemberValidation])
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  public async createCrewMember(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.crewmember.createCrewMember(data);
      result.send(res);
    } catch (error: any) {
      console.log("createCrewMember Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // GET Crew Member API
  @GET("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID])
  @GETPayloadDecorator()
  public async getCrewMember(req: RequestX, res: Response, data: any): Promise<void> {
    try {

      const result = await this.crewmember.getCrewMember(data);
      result.send(res);
    } catch (error: any) {
      console.log("getCrewMemebrByID Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // Update Crew Member API
  @PUT("/:id")
  @AccessTokenGuard()
  @PUTPayloadDecorator()
  public async updateCrew(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.crewmember.updateCrewMeember(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateCrew Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };



  // GET Crew Member API
  @POST("/getAllCrewMember")
  @AccessTokenGuard()
  @GETALLPayloadDecorator()
  public async getAllCrewMember(req: RequestX, res: Response, data: any): Promise<void> {
    try {

      const result = await this.crewmember.getAllCrewMember(data);
      result.send(res);
    } catch (error: any) {
      console.log("getAllCrewMember Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };


  // GET Crew Member All Work Order API
  @POST("/getCrewMemberAllWorkOrder")
  @AccessTokenGuard()
  @GETALLPayloadDecorator()
  public async getCrewMemberAllWorkOrder(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.crewmember.getCrewMemberAllWorkOrder(data);
      result.send(res);
    } catch (error: any) {
      console.log("getCrewMemberAllWorkOrder Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

}
