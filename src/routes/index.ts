import { Express, Router } from 'express';
import { attachControllers } from './api.routes';
import { AuthController, HelloController, OrganizationController, UserController } from '../modules/controllers';
import { createRoleMiddleware, ValidatorMiddleware } from '../middlewares';
import passport from 'passport';
import session from 'express-session';

export const combineRouters = (app: Express) => {
  const apiRouter = Router();
  app.use(passport.initialize());
  app.use(session({ secret: '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', resave: false, saveUninitialized: false }));

  attachControllers(
    apiRouter,
    [
      AuthController,
      UserController,
      OrganizationController,
      HelloController
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