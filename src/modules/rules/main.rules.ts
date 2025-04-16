import Joi from "joi";

// Params ID Validation Schema
export const ValidateParamsID = {
  params: Joi.object({
    id: Joi.string().required().messages({
      "any.required": "Id is required",
    }),
  }),
};