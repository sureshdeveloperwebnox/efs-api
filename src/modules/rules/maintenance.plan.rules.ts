import Joi from "joi";

// Create Maintenance Plan
export const CreateMaintenancePlanValidation = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization id is required",
      "number.base": "Organization id must be a number",
    }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.base": "Name must be a string",
    }),
    description: Joi.string().required().messages({
      "any.required": "Description is required",
      "string.base": "Description must be a string",
    }),
    start_date: Joi.string().required().messages({
      "any.required": "Start date is required",
      "string.base": "Start date must be a string",
    }),
    end_date: Joi.string().required().messages({
      "any.required": "End date is required",
      "string.base": "End date must be a string",
    }),
    frequency: Joi.string().required().messages({
      "any.required": "Frequency is required",
      "string.base": "Frequency must be a string",
    }),
    frequency_unit: Joi.number().required().messages({
      "any.required": "Frequency unit is required",
      "number.base": "Frequency unit must be a number",
    }),
    frequency_unit_type: Joi.string().required().messages({
      "any.required": "Frequency unit type is required",
      "string.base": "Frequency unit type must be a string",
    }),
    is_active: Joi.number().required().messages({
      "any.required": "Is active is required",
      "number.base": "Is active must be a number",
    }),
  }),
};

// Update Maintenance Plan
export const UpdateMaintenancePlanValidation = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization id is required",
      "number.base": "Organization id must be a number",
    }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.base": "Name must be a string",
    }),
    description: Joi.string().required().messages({
      "any.required": "Description is required",
      "string.base": "Description must be a string",
    }),
    start_date: Joi.string().required().messages({
      "any.required": "Start date is required",
      "string.base": "Start date must be a string",
    }),
    end_date: Joi.string().required().messages({
      "any.required": "End date is required",
      "string.base": "End date must be a string",
    }),
    frequency: Joi.string().required().messages({
      "any.required": "Frequency is required",
      "string.base": "Frequency must be a string",
    }),
    frequency_unit: Joi.string().required().messages({
      "any.required": "Frequency unit is required",
      "number.base": "Frequency unit must be a number",
    }),
    frequency_unit_type: Joi.string().required().messages({
      "any.required": "Frequency unit type is required",
      "string.base": "Frequency unit type must be a string",
    }),
    is_active: Joi.number().required().messages({
      "any.required": "Is active is required",
      "number.base": "Is active must be a number",
    }),
  }),
};
