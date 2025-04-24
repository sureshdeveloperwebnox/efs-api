import Joi from "joi";

// Params ID Validation Schema
export const ValidateParamsID = {
  params: Joi.object({
    id: Joi.string().required().messages({
      "any.required": "ID is required",
      "number.base": "ID must be a number",
    }),
  }),
};

// Validate Date time
export const ValidateDateTime = {
  headers: Joi.object({
    date_time: Joi.string().required().messages({
      "any.required": "Date time is required",
      "string.base": "Date time must be a string",
    }),
  }).unknown(true)
};
