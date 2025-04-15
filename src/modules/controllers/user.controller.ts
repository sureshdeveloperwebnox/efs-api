import { RequestX } from "../../utils/request.interface";
import { Controller, POST, GET, Validate, DELETE, PUT } from "../../decorators";
import { ApiResult } from "../../utils/api-result";
import { NextFunction, Response } from "express";
import { User } from "../services/users";
import prisma from "@/config/db";
import { AccessTokenGuard } from '../../middlewares/token.guard';
import { userParams, userRegisterValidationSchema, userUpdationValidationSchema } from "../rules";


@Controller('/user')
export class UserController {
  private user!: User;
  constructor() {
    this.user = new User();
  }

  @POST('')
  @Validate([userRegisterValidationSchema])
  public async register(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.user.register(req.body);
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 400).send(res);
    }
  }

  @GET("/:id")
  @Validate([userParams])
  @AccessTokenGuard()
  public async getUser(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const result = await this.user.getUser({ id: id });
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 400).send(res);
    }
  }

  @PUT("/:id")
  @Validate([userParams, userUpdationValidationSchema])
  public async updateUser(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id

      const body = req.body;

      const data = { ...body, id }

      const result = await this.user.updateUser(data);
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 400).send(res)
    }
  }

  @DELETE("/:id")
  @Validate([userParams])
  public async deleteUser(req: RequestX, res: Response): Promise<void> {
    try {
      const id = req.params.id

      const body = req.body;

      const data = { ...body, id }

      const result = await this.user.deleteUser(data);
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error.message, 400).send(res)
    }
  }

  @GET('/user-profiles')
  @AccessTokenGuard()
  public async getUserProfiles(req: RequestX, res: Response): Promise<void> {
    try {
      const result = await this.user.getUserProfiles();
      result.send(res);
    } catch (error: any) {
      ApiResult.error(error?.message || "Unexpected error", 400).send(res);
    }
  }
  

}