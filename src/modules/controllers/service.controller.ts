import { RequestX } from "../../utils/request.interface";
import {
  Controller,
  GET,
  POSTPayloadDecorator,
  POST,
  PUT,
  Validate,
  PUTPayloadDecorator,
  GETALLPayloadDecorator,
} from "../../decorators";
import { Service } from "../services";
import { ApiResult } from "../../utils/api-result";
import { AccessTokenGuard } from "../../middlewares";
import { CreateServiceValidation, ValidateParamsID } from "../rules";

@Controller("/service")
export class ServiceController {
  private service!: Service;

  constructor() {
    this.service = new Service();
  }

  // Create Service API Endpoint
  @POST("")
  @AccessTokenGuard()
  @Validate([CreateServiceValidation])
  public async createService(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.service.createService(req.body);
      result.send(res);
    } catch (error: any) {
      console.log("CreateService Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Get Service By ID API
  @GET("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID])
  public async getServiceByID(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const body = req.body;

      const data = { ...body, id };

      const result = await this.service.getServiceByID(data);
      result.send(res);
    } catch (error: any) {
      console.log("getServiceByID Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Update Service API
  @PUT("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID])
  @PUTPayloadDecorator()
  public async updateService(
    req: RequestX,
    res: Response,
    data: any
  ): Promise<void> {
    try {
      const result = await this.service.updateService(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateService Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Get All Service API Endpoint
  @POST("/getAllService")
  @AccessTokenGuard()
  @GETALLPayloadDecorator()
  public async getAllService(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.service.getAllService(data);
      result.send(res);
    } catch (error: any) {
      console.log("getAllService Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  @POST("/getAllServiceByID")
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  public async getAllServiceByID(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.service.getAllServiceByID(data);
      result.send(res);
    } catch (error: any) {
      console.log("getAllServiceByID Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }
}
