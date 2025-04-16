import { Controller, GET, POST, Validate } from "../../decorators";
import { Skills } from "../services/skills";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import { CreateSkill } from "../rules";
import { AccessTokenGuard } from "../../middlewares";
import { ValidateParamsID } from '../rules/main.rules';

// Skill Controller
@Controller("/skills")
export class SkillController {
  private skills!: Skills;

  constructor() {
    this.skills = new Skills();
  }

  // CREATE Skills API
  @POST("")
  @Validate([CreateSkill])
  @AccessTokenGuard()
  public async createSkills(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.skills.createSkill(req.body);
      result.send(res);
    } catch (error: any) {
      console.log('createSkills error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // GET Skills By ID
  @GET("/:id")
  @Validate([ValidateParamsID])
  public async getSkillByID(req: RequestX, res: Response): Promise<void> {
    try {
        const id = req.params.id

        const body = req.body;
  
        const data = { ...body, id }
        
      const result = await this.skills.getSkillByID(data);
      result.send(res);
    } catch (error: any) {
      console.log('getSkillByID error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // GET Skills
  @GET("/getSkills")
  @AccessTokenGuard()
  public async getSkills(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.skills.getSkills();
      result.send(res);
    } catch (error: any) {
      console.log('getSkills error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };
  
}
