import { Request, Response, NextFunction } from 'express';
import { VALIDATE_METADATA } from '../decorators';
import { ResponseGenerator } from '../utils/response-generator';
import { RequestX } from '../utils/request.interface';

export const ValidatorMiddleware = (
  req: RequestX, 
  res: Response, 
  next: NextFunction,
  rules: any[] = []
) => {
  // If no rules provided or empty array, continue
  if (!rules || rules.length === 0) {
    return next();
  }

  // Initialize an array to collect validation errors
  const validationErrors: any[] = [];

  // Iterate over each rule in the rules array
  for (const rule of rules) {
    // Validate body if body rule exists
    if (rule.body) {
      const { error, value } = rule.body.validate(req.body, { abortEarly: false });
      if (error) {
        validationErrors.push(...error.details.map((detail: any) => ({
          field: detail.path.join('.'),
          message: detail.message
        })));
      } else {
        req.body = value; // Store validated body
      }
    }

    // Validate params if params rule exists
    if (rule.params) {
      const { error } = rule.params.validate(req.params, { abortEarly: false });
      if (error) {
        validationErrors.push(...error.details.map((detail: any) => ({
          field: detail.path.join('.'),
          message: detail.message
        })));
      }
    }

    // Validate query if query rule exists
    if (rule.query) {
      const { error } = rule.query.validate(req.query, { abortEarly: false });
      if (error) {
        validationErrors.push(...error.details.map((detail: any) => ({
          field: detail.path.join('.'),
          message: detail.message
        })));
      }
    }

    // Validate headers if headers rule exists
    if (rule.headers) {
      const { error } = rule.headers.validate(req.headers, { abortEarly: false });
      if (error) {
        validationErrors.push(...error.details.map((detail: any) => ({
          field: detail.path.join('.'),
          message: detail.message
        })));
      }
    }
  }

  // If validation errors exist, send the error response
  if (validationErrors.length > 0) {
    return ResponseGenerator.send(
      res, 
      ResponseGenerator.error('Validation error', 400, validationErrors)
    );
  }

  // Store validated data in the request object
  req.validatedData = {
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers
  };

  // Proceed to the next middleware
  next();
};
