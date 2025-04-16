import Joi from "joi";

// Create Holiday Validation Schema
export const CreateHolidayValidationSchema = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization id is required",
      "number.base": "Organization id must be a number",
    }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.base": "Name must be a string",
    }),
    holiday_date: Joi.string().required().messages({
      "any.required": "Holiday date is required",
      "string.base": "Holiday date must be a string",
    }),
    is_recurring: Joi.number().required().messages({
      "any.required": "Is recurring is required",
      "number.base": "Is recurring must be a number",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Created_at is required",
      "string.base": "Created_at must be a string",
    }),
  }),
};
