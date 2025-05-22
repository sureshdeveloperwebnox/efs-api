import { RequestX } from "../../utils/request.interface";
import { Controller, POST, GET, Validate, DELETE, PUT, GETALLPayloadDecorator } from "../../decorators";
import { ApiResult } from "../../utils/api-result";
import { NextFunction, Response } from "express";
import { User } from "../services/users";
import prisma from "@/config/db";
import { AccessTokenGuard } from '../../middlewares/token.guard';
import { ValidateParamsID, userRegisterValidationSchema, userUpdationValidationSchema } from "../rules";

// User Controller

@Controller('/user')
export class UserController {
  private user!: User;
  constructor() {
    this.user = new User();
  }

  // User Registration API 
  @POST('')
  @Validate([userRegisterValidationSchema])
  public async register(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.user.register(req.body);
      result.send(res);
    } catch (error: any) {
      console.log('register error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Get User API
  @GET("/:id")
  @Validate([ValidateParamsID])
  @AccessTokenGuard()
  public async getUser(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const result = await this.user.getUser({ id: id });
      result.send(res);
    } catch (error: any) {
      console.log('getUser error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // Update User API
  @PUT("/:id")
  @Validate([ValidateParamsID, userUpdationValidationSchema])
  public async updateUser(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id

      const body = req.body;

      const data = { ...body, id }

      const result = await this.user.updateUser(data);
      result.send(res);
    } catch (error: any) {
      console.log('updateUser error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  // DELETE User API
  @DELETE("/:id")
  @Validate([ValidateParamsID])
  public async deleteUser(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id

      const body = req.body;

      const data = { ...body, id }

      const result = await this.user.deleteUser(data);
      result.send(res);
    } catch (error: any) {
      console.log('deleteUser error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }

  @GET('/user-profiles')
  @AccessTokenGuard()
  public async getUserProfiles(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.user.getUserProfiles();
      result.send(res);
    } catch (error: any) {
      console.log('getUserProfiles error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }


  @POST('/getAllUser')
  @AccessTokenGuard()
  @GETALLPayloadDecorator()
  public async getAllUser(req: RequestX, res: Response, data: any): Promise<void> {
    try {
      const result = await this.user.getAllUser(data);
      result.send(res);
    } catch (error: any) {
      console.log('getAllUser error', error);
      ApiResult.error(error.message || "Internal server error", 500);
    }
  }


}