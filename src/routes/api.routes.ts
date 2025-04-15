import { Router, Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { 
  CONTROLLER_METADATA, 
  METHOD_METADATA, 
  PATH_METADATA,
  MIDDLEWARE_METADATA
} from '../decorators';
import { VALIDATE_METADATA } from '../decorators/middleware.decorator';
import { AUTHENTICATE_METADATA } from '../decorators/authenticate.decorator';
import { createRoleMiddleware } from '../middlewares/auth.middleware';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export interface AttachControllersOptions {
  middleware: {
    auth: any;
    validator: any;
  };
}

export const attachControllers = (
  router: Router,
  controllers: any[],
  options: AttachControllersOptions
) => {
  for (const controller of controllers) {
    const instance = new controller();
    const basePath = Reflect.getMetadata(CONTROLLER_METADATA, controller);
    const prototype = Object.getPrototypeOf(instance);
    const methodNames = Object.getOwnPropertyNames(prototype)
      .filter(prop => prop !== 'constructor' && typeof prototype[prop] === 'function');

    for (const methodName of methodNames) {
      const method = prototype[methodName];

      // Skip methods without @METHOD decorator
      if (!Reflect.hasMetadata(METHOD_METADATA, method)) continue;

      const httpMethod = Reflect.getMetadata(METHOD_METADATA, method) as HttpMethod;
      const path = Reflect.getMetadata(PATH_METADATA, method);
      const middlewares = Reflect.getMetadata(MIDDLEWARE_METADATA, method) || [];
      const validationRules = Reflect.getMetadata(VALIDATE_METADATA, method) || [];
      const authCategories = Reflect.getMetadata(AUTHENTICATE_METADATA, method) || [];

      const fullPath = `${basePath}${path}`;

      // 👇 FIXED: Support req, res, next
      const routeHandler = (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(method.call(instance, req, res, next))
          .catch((error: any) => {
            console.error(`Error in ${methodName}:`, error);
            res.status(500).json({
              success: false,
              message: 'Internal server error',
              error: error.message,
            });
          });
      };

      const middlewareStack: any[] = [...middlewares];

      if (authCategories.length > 0) {
        middlewareStack.push(createRoleMiddleware(authCategories));
      }

      if (validationRules.length > 0) {
        middlewareStack.push((req: any, res: any, next: any) => {
          options.middleware.validator(req, res, next, validationRules);
        });
      }

      // ✅ Register route
      router[httpMethod](fullPath, ...middlewareStack, routeHandler);

      // Optional: log route registration
      console.log(`[Route] ${httpMethod.toUpperCase()} ${fullPath}`);
    }
  }
};
