import { getDateTime } from "../utils/get.date.time"; // adjust import as needed
import { Request, Response, NextFunction } from "express";

// POST Create Payload Decorator
export function POSTPayloadDecorator() {

  const now = new Date();
  const formatted = now.toISOString().slice(0, 19).replace('T', ' ');

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const body = req.body;
        const date = await getDateTime(req);
        const data = { ...body, date_time: new Date().toISOString().slice(0, 19).replace('T', ' ') };

        // Call the original method with injected `data`
        return await originalMethod.call(this, req, res, data);
      } catch (error) {
        console.error("InjectPayload Error:", error);
        next(error);
      }
    };

    return descriptor;
  };
}

// GET Get Payload Decorator
export function GETPayloadDecorator() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const id = req.params.id;

        const data = {
          id
        }

        // Call the original method with injected `data`
        return await originalMethod.call(this, req, res, data);
      } catch (error) {
        console.error("InjectPayload Error:", error);
        next(error);
      }
    };

    return descriptor;
  };
}

// PUT Update Payload Decorator
export function PUTPayloadDecorator() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const id = req.params.id;
        const body = req.body;
        const date = await getDateTime(req);
        const data = { ...body, id, date_time: new Date().toISOString().slice(0, 19).replace('T', ' ')};

        // Call the original method with injected `data`
        return await originalMethod.call(this, req, res, data);
      } catch (error) {
        console.error("InjectPayload Error:", error);
        next(error);
      }
    };

    return descriptor;
  };
}

// GET ALL Get Payload Decorator
export function GETALLPayloadDecorator() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const body = req.body;
        // Call the original method with injected `data`
        return await originalMethod.call(this, req, res, body);
      } catch (error) {
        console.error("InjectPayload Error:", error);
        next(error);
      }
    };

    return descriptor;
  };
}
