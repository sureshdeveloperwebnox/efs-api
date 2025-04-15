import { Controller, GET, POST } from "../../decorators";
import { UserSkills } from "../services/user.skill";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";

@Controller("/user-skills")
export class UserSkillController {
  private userskills!: UserSkills;

  constructor() {
    this.userskills = new UserSkills();
  }

  // CREATE Skills API
  @POST("")
  public async createSkills(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.userskills.assignUserSkill(req.body);
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 500);
    }
  }
}
