import { AccessTokenGuard } from "../../middlewares";
import { Controller, GET, GETPayloadDecorator, POST, POSTPayloadDecorator, PUT, PUTPayloadDecorator, Validate } from "../../decorators";
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
  @POSTPayloadDecorator()
  public async createCompany(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.company.createCompany(data);
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
  public async getCompanyByID(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req?.params?.id;
      const result = await this.company.getCompanyByID({id});
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



    // GET All Company API
  @POST("/getAllCompany")
  @AccessTokenGuard()
  public async getAllCompany(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.company.getAllCompany();
      result.send(res);
    } catch (error: any) {
      console.log("getAllCompany Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  };
}
