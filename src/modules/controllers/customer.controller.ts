import { RequestX } from "../../utils/request.interface";
import { Controller, GET, POST, PUT, Validate } from "../../decorators";
import { Customers } from "../services";
import { ApiResult } from "../../utils/api-result";
import { AccessTokenGuard } from "../../middlewares";
import {
  CreateCustomerValidation,
  UpdateCompanyValidation,
  ValidateDateTime,
  ValidateParamsID,
} from "../rules";
import { getDateTime } from "../../utils/get.date.time";

@Controller("/customers")
export class CustomerController {
  private customers!: Customers;

  constructor() {
    this.customers = new Customers();
  }

  // Create Customer API Endpoint
  @POST("")
  @AccessTokenGuard()
  @Validate([CreateCustomerValidation, ValidateDateTime])
  public async createCustomer(req: RequestX, res: Response): Promise<void> {
    try {

        // Get Date Time
      const date = await getDateTime(req);

      const data = {
        ...req.body,
        date
      };

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
  public async getCustomerByID(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const body = req.body;

      const data = { ...body, id };

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
  @Validate([ValidateParamsID, UpdateCompanyValidation])
  public async updateCustomer(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const body = req.body;

      const data = { ...body, id };

      const result = await this.customers.updateCustomer(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateCustomer Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }
}
