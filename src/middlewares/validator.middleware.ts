import { Request, Response, NextFunction } from 'express';
import { ResponseGenerator } from '../utils/response-generator';
import { RequestX } from '../utils/request.interface';

export const ValidatorMiddleware = (
  req: RequestX,
  res: Response,
  next: NextFunction,
  rules: any[] = []
) => {
  const validationErrors: any[] = [];

  for (const rule of rules) {
    if (rule.body) {
      const { error, value } = rule.body.validate(req.body, { abortEarly: false });
      if (error) {
        validationErrors.push(...error.details.map((d: any) => ({
          field: d.path.join('.'),
          message: d.message,
        })));
      } else {
        req.body = value;
      }
    }

    if (rule.params) {
      const { error } = rule.params.validate(req.params, { abortEarly: false });
      if (error) {
        validationErrors.push(...error.details.map((d: any) => ({
          field: d.path.join('.'),
          message: d.message,
        })));
      }
    }

    if (rule.query) {
      const { error } = rule.query.validate(req.query, { abortEarly: false });
      if (error) {
        validationErrors.push(...error.details.map((d: any) => ({
          field: d.path.join('.'),
          message: d.message,
        })));
      }
    }

    if (rule.headers) {
      const { error } = rule.headers.validate(req.headers, { abortEarly: false });
      if (error) {
        validationErrors.push(...error.details.map((d: any) => ({
          field: d.path.join('.'),
          message: d.message,
        })));
      }
    }
  }

  if (validationErrors.length > 0) {
    return ResponseGenerator.send(
      res,
      ResponseGenerator.error('Validation error', 400, validationErrors)
    );
  }

  req.validatedData = {
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  };

  next();
};
