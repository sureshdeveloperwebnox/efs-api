import { Controller, GET, POST } from "../../decorators";
import { Skills } from "../services/skills";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";

@Controller("/skills")
export class SkillController {
  private skills!: Skills;

  constructor() {
    this.skills = new Skills();
  }

  // CREATE Skills API
  @POST("")
  public async createSkills(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.skills.createSkill(req.body);
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 500);
    }
  }

  // GET Skills By ID
  @GET("/:id")
  public async getSkillByID(req: RequestX, res: Response): Promise<void> {
    try {
        const id = req.params.id

        const body = req.body;
  
        const data = { ...body, id }
        
      const result = await this.skills.getSkillByID(data);
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 500);
    }
  }

  // GET Skills
  @GET("/getSkills")
  public async getSkills(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.skills.getSkills();
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 500);
    }
  }
}
