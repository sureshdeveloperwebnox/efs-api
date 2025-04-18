import { AccessTokenGuard } from "../../middlewares";
import { Controller, GET, POST, PUT, Validate } from "../../decorators";
import { Company } from "../services";
import { RequestX } from "../../utils/request.interface";
import { ApiResult } from "../../utils/api-result";
import {
  CreateCompanyValidation,
  UpdateCompanyValidation,
  ValidateParamsID,
} from "../rules";

@Controller("/company")
export class CompanyController {
  private company!: Company;

  constructor() {
    this.company = new Company();
  }

  // Create Company API
  @POST("")
  @Validate([CreateCompanyValidation])
  @AccessTokenGuard()
  public async createCompany(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.company.createCompany(req.body);
      result.send(res);
    } catch (error: any) {
      console.log("createEquipment Error", error);
      ApiResult.error(error.message + "Internal server error", 500);
    }
  };

  // GET Company By ID API
  @GET("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID])
  public async getEquipmentsByID(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const body = req.body;

      const data = { ...body, id };

      const result = await this.company.getCompanyByID(data);
      result.send(res);
    } catch (error: any) {
      console.log("getCompanyByID Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };

  // Update Company API
  @PUT("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID, UpdateCompanyValidation])
  public async updateCompany(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const body = req.body;

      const data = { ...body, id };

      const result = await this.company.updateCompany(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateCompany Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };
}
