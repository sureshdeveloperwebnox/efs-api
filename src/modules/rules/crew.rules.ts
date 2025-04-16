import Joi from "joi";

// Create Crew Validation Schema
export const CreateCrewValidation = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization ID is required",
      "number.base": "Organization ID must be a number",
    }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.base": "Name must be a string",
    }),
    leader_id: Joi.number().required().messages({
      "any.required": "Leader id is required",
      "number.base": "Leader id must be a number",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Created at is required",
      "string.base": "Created at must be a string",
    }),
  }),
};
