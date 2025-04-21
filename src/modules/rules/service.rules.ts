import Joi from "joi";

export const CreateServiceValidation = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization ID is required",
      "number.base": "Organization ID must be a number",
    }),
    description: Joi.string().required().messages({
      "any.required": "Description is required",
      "string.base": "Description must be a string",
    }),
    duration: Joi.number().required().messages({
      "any.required": "Duration is required",
      "number.base": "Duration must be a number",
    }),
    price: Joi.number().required().messages({
      "any.required": "Price is required",
      "number.base": "Price must be a number",
    }),
    required_skills: Joi.string().required().messages({
      "any.required": "Required skills is required",
      "string.base": "Required skills must be a string",
    }),
  }),
};
