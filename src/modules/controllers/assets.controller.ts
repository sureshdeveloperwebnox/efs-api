import { AccessTokenGuard } from "../../middlewares";
import {
  GET,
  POST,
  PUT,
  Validate,
  POSTPayloadDecorator,
  Controller,
  PUTPayloadDecorator,
  GETPayloadDecorator,
  GETALLPayloadDecorator,
} from "../../decorators";
import { Assets } from "../services";
import { ApiResult } from "../../utils/api-result";
import { RequestX } from "../../utils/request.interface";
import {
  CreateAssetValidation,
  ValidateDateTime,
  ValidateParamsID,
} from "../rules";
import { UpdateAssetValidation } from "../rules/asstes.rules";

// Asset Controller API

@Controller("/assets")
export class AssetController {
  private assets!: Assets;

  constructor() {
    this.assets = new Assets();
  }

  // Create Asset API
  @POST("")
  @Validate([ValidateDateTime, CreateAssetValidation])
  @AccessTokenGuard()
  @POSTPayloadDecorator()
  public async createAsset(
    req: RequestX,
    res: Response,
    data: any
  ): Promise<void> {
    try {
      const result = await this.assets.createAsset(data);
      result.send(res);
    } catch (error: any) {
      console.log("createAsset Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // GET Asset By ID API
  @GET("/:id")
  @AccessTokenGuard()
  @Validate([ValidateParamsID])
  @GETPayloadDecorator()
  public async getAssetByID(
    req: RequestX,
    res: Response,
    data: any
  ): Promise<void> {
    try {
      const result = await this.assets.getAssetByID(data);
      result.send(res);
    } catch (error: any) {
      console.log("getAssetByID Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Update Asset Type API
  @PUT("/:id")
  @Validate([UpdateAssetValidation, ValidateDateTime])
  @AccessTokenGuard()
  @PUTPayloadDecorator()
  public async updateAsset(
    req: RequestX,
    res: Response,
    data: any
  ): Promise<void> {
    try {
      const result = await this.assets.updateAsset(data);
      result.send(res);
    } catch (error: any) {
      console.log("updateAsset Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // GET All Assets API
  @POST("/getAllAssets")
  @AccessTokenGuard()
  @GETALLPayloadDecorator()
  public async getAllAssets(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.assets.getAllAssets(data);
      result.send(res);
    } catch (error: any) {
      console.log("getAllAssets Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // GET All Assets By ID API
  @POST("/getAllAssetByID")
  @POSTPayloadDecorator()
  @AccessTokenGuard()
  public async getAllAssetByID(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.assets.getAllAssetByID(data);
      result.send(res);
    } catch (error: any) {
      console.log("getAllAssets Controller Error", error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }
}
