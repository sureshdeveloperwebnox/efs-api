import { ApiResult } from "../../utils/api-result";
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
import { Equipments } from "../services/equipments";
import { RequestX } from "../../utils/request.interface";
import {
  CreateEquipmentValidation,
  UpdateEquipmentValidation,
  ValidateParamsID,
} from "../rules";
import { AccessTokenGuard } from "../../middlewares";

@Controller("/equipments")
export class EquipmentController {
  private equipments!: Equipments;

  constructor() {
    this.equipments = new Equipments();
  }

  // Create Equipment API
  @POST("")
  @Validate([CreateEquipmentValidation])
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  public async createEquipment(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.equipments.createEquipment(data);
      result.send(res);
    } catch (error: any) {
      console.log("createEquipment Error", error);
      ApiResult.error(error.message + "Internal server error", 500);
    }
  }

  // GET Equipment By ID API
  @GET("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID])
  @GETPayloadDecorator()
  public async getEquipmentsByID(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const body = req.body;

      const data = { ...body, id };

      const result = await this.equipments.getEquipmentsByID(data);
      result.send(res);
    } catch (error: any) {
      console.log("getEquipmentsByID Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Update Equipment API
  @PUT("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID, UpdateEquipmentValidation])
  @PUTPayloadDecorator()
  public async updateEquipment(
    req: RequestX,
    res: Response,
    data: any
  ): Promise<void> {
    try {
      const result = await this.equipments.updateEquipment(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateEquipment Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Get Equipment API
  @POST("/getAllEquipment")
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  public async getAllEquipment(
    req: RequestX,
    res: Response,
    data: any
  ): Promise<void> {
    try {
      const result = await this.equipments.getAllEquipment(data);
      result.send(res);
    } catch (error: any) {
      console.log("createEquipment Error", error);
      ApiResult.error(error.message + "Internal server error", 500);
    }
  }
}
