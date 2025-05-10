// Importing the custom Request interface
import { RequestX } from "../../utils/request.interface";
import { Controller, POST, GET, Validate, PUT, DELETE, PUTPayloadDecorator } from "../../decorators";
import {
  CreateOrganizationValidation,
  UpdateOrganizationValidation,
  ValidateParamsID,
} from "../rules";
import { ApiResult } from "../../utils/api-result";
import { NextFunction, Response } from "express";
import { Organization } from "../services/organization";
import { AccessTokenGuard } from "../../middlewares/token.guard";

// Organization Controller
@Controller("/organization")
export class OrganizationController {
  private organization!: Organization;

  constructor() {
    this.organization = new Organization();
  }

  // CREATE Organization API endpoint
  @POST("")
  @Validate([CreateOrganizationValidation])
  public async register(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.organization.register(req.body);
      result.send(res);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      ApiResult.error(message, 400).send(res);
    }
  }

  // GET Organization API endpoint
  @GET("/:id")
  @Validate([ValidateParamsID])
  @AccessTokenGuard()
  public async getOrganization(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.organization.getOrganization({
        id
      });
      result.send(res);
    } catch (error: any) {
      console.log('getOrganization error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // UPDATE Organization API endpoint
  @PUT("/:id")
  @Validate([UpdateOrganizationValidation])
  @AccessTokenGuard()
  @PUTPayloadDecorator()
  public async updateOrganization(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      // const id = req.params.id;
      // const body = req.body;
      // const data = { ...body, id };
      const result = await this.organization.updateOrganization(data);
      result.send(res);
    } catch (error: any) {
      console.log('updateOrganization error', error); 
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // DELETE Organization API endpoint
  @DELETE("/:id")
  @Validate([ValidateParamsID])
  @AccessTokenGuard()
  public async deleteOrganization(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.organization.deleteOrganization({
         id,
      });
      result.send(res);
    } catch (error: any) {
      console.log('deleteOrganization error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }


    // GET All Organization API endpoint
    @POST("/getAllOrganization")
    @AccessTokenGuard()
    public async getAllOrganization(req: RequestX, res: Response): Promise<void> {
      try {
        const result = await this.organization.getAllOrganization(req.body);
        result.send(res);
      } catch (error: any) {
        console.log('getOrganization error', error);
        ApiResult.error(error.message || "Internal server error", 500);
      }
    }
  

}
