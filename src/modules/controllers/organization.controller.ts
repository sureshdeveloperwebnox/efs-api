// Importing the custom Request interface
import { RequestX } from "../../utils/request.interface";
import { Controller, POST, GET, Validate, PUT, DELETE } from "../../decorators";
import {
  organizationRegisterValidation,
  userParamsValidation,
  organizationUpdationValidation,
} from "../rules";
import { ApiResult } from "../../utils/api-result";
import { NextFunction, Response } from "express";
import { Organization } from "../services/organization";
import { AccessTokenGuard } from "../../middlewares/token.guard";

@Controller("/organization")
export class OrganizationController {
  private organization!: Organization;

  constructor() {
    this.organization = new Organization();
  }

  // CREATE Organization API endpoint
  @POST("")
  @Validate([userParamsValidation, organizationRegisterValidation])
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
  @Validate([userParamsValidation])
  @AccessTokenGuard()
  public async getOrganization(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.organization.getOrganization({
        organization_id: id,
      });
      result.send(res);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      ApiResult.error(message, 400).send(res);
    }
  }

  // UPDATE Organization API endpoint
  @PUT("/:id")
  @Validate([userParamsValidation, organizationUpdationValidation])
  @AccessTokenGuard()
  public async updateOrganization(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const body = req.body;
      const data = { ...body, id };
      const result = await this.organization.updateOrganization(data);
      result.send(res);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      ApiResult.error(message, 400).send(res);
    }
  }

  // DELETE Organization API endpoint
  @DELETE("/:id")
  @Validate([userParamsValidation])
  @AccessTokenGuard()
  public async deleteOrganization(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.organization.deleteOrganization({
        organization_id: id,
      });
      result.send(res);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      ApiResult.error(message, 400).send(res);
    }
  }
}
