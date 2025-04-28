import { Express, Router } from 'express';
import { attachControllers } from './api.routes';
import { AssetController, AuthController, BusinessHoursController, CompanyController, CrewController, CrewMemberController, CustomerController, EquipmentController, HelloController, HolidaysController, MaintenancePlanAssetController, MaintenancePlanController, OrganizationController, PartController, ServiceController, ServiceTypeController, SkillController, TimeOffRequestController, UserController, UserSkillController, WorkOrderController, WorkOrderCrewController } from '../modules/controllers';
import { createRoleMiddleware, ValidatorMiddleware } from '../middlewares';
import passport from 'passport';
import session from 'express-session';
import envConfig from '../config/env.config';

export const combineRouters = (app: Express) => {
  const apiRouter = Router();
  app.use(passport.initialize());
  app.use(session({ secret: envConfig.GOOGLE_CLIENT_SECRET, resave: false, saveUninitialized: false }));

  attachControllers(
    apiRouter,
    [
      AuthController,
      UserController,
      OrganizationController,
      SkillController,
      HelloController,
      BusinessHoursController,
      UserSkillController,
      HolidaysController,
      TimeOffRequestController,
      CrewController,
      CrewMemberController,
      EquipmentController,
      CompanyController,
      CustomerController,
      ServiceController,
      PartController,
      ServiceTypeController,
      AssetController,
      MaintenancePlanController,
      MaintenancePlanAssetController,
      WorkOrderController,
      WorkOrderCrewController
    ],
    {
      middleware: {
        auth: createRoleMiddleware,
        validator: ValidatorMiddleware,
      },
    }
  );
  
  app.use('/api', apiRouter);

};