import Joi from "joi";

// Create Skill Validation Schema
export const CreateSkill = {
  body: Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.base": "Name must be a string"
    }),
    description: Joi.string().required().messages({
      "any.required": "Description is required",
      "string.base": "Description must be a string"
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Created at is required",
      "string.base": "Created at must be a string"
    }),
  }),
};
