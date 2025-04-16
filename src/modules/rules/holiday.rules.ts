import Joi from "joi";

// Create Holiday Validation Schema
export const CreateHolidayValidationSchema = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization id is required",
    }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    holiday_date: Joi.string().required().messages({
      "any.required": "Holiday date is required",
    }),
    is_recurring: Joi.number().required().messages({
      "any.required": "Is recurring is required",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Holiday date is required",
    }),
  }),
};
