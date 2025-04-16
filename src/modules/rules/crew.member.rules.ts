import Joi from "joi";

// Create Crew Member Validation
export const CreateCrewMemberValidation = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization ID is required",
      "number.base": "Organization ID must be a number",
    }),
    crew_id: Joi.number().required().messages({
      "any.required": "Crew ID is required",
      "number.base": "Crew ID must be a number",
    }),
    user_id: Joi.number().required().messages({
      "any.required": "User ID is required",
      "number.base": "User ID must be a number",
    }),
    role: Joi.string().required().messages({
      "any.required": "Role is required",
      "string.base": "Role must be a string",
    }),
    created_at: Joi.number().required().messages({
      "any.required": "Created_at is required",
      "string.base": "Created_at must be a string",
    }),
  }),
};
