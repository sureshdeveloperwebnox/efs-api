import { RequestX } from "../../utils/request.interface";
import {
  Controller,
  GET,
  GETPayloadDecorator,
  POST,
  POSTPayloadDecorator,
  PUT,
  PUTPayloadDecorator,
  Validate,
} from "../../decorators";
import { Customers } from "../services";
import { ApiResult } from "../../utils/api-result";
import { AccessTokenGuard } from "../../middlewares";
import {
  CreateCustomerValidation,
  UpdateCompanyValidation,
  UpdateCustomerValidation,
  ValidateDateTime,
  ValidateParamsID,
} from "../rules";

@Controller("/customers")
export class CustomerController {
  private customers!: Customers;

  constructor() {
    this.customers = new Customers();
  }

  // Create Customer API Endpoint
  @POST("")
  @Validate([CreateCustomerValidation, ValidateDateTime])
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  public async createCustomer(
    req: RequestX,
    res: Response,
    data: any
  ): Promise<void> {
    try {
      const result = await this.customers.createCustomer(data);
      result.send(res);
    } catch (error: any) {
      console.log("createCustomer Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // GET Customer By ID API
  @GET("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID])
  @GETPayloadDecorator()
  public async getCustomerByID(
    req: RequestX,
    res: Response,
    data: any
  ): Promise<void> {
    try {
      const result = await this.customers.getCustomerByID(data);
      result.send(res);
    } catch (error: any) {
      console.log("getCustomerByID Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Update Customer API
  @PUT("/:id")
  @AccessTokenGuard()
  @PUTPayloadDecorator()
  @Validate([ValidateParamsID, UpdateCustomerValidation])
  public async updateCustomer(
    req: RequestX,
    res: Response,
    data: any
  ): Promise<void> {
    try {
      const result = await this.customers.updateCustomer(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateCustomer Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Get All Customer API
  @POST("/getAllCustomer")
  @AccessTokenGuard()
  public async getAllCustomer(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.customers.getAllCustomer();
      result.send(res);
    } catch (error: any) {
      console.log("getAllCustomer Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }


  @PUT("/updateCustomerStatus/:id")
  @AccessTokenGuard()
  @PUTPayloadDecorator()
  @Validate([ValidateParamsID, UpdateCustomerValidation])
  public async updateCustomerStatusChange(
    req: RequestX,
    res: Response,
    data: any
  ): Promise<void> {
    try {
      const result = await this.customers.updateCustomerStatusChange(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateCustomerStatusChange Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

}
