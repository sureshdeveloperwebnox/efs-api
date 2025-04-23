import Joi from "joi";

// Create Part Validation
export const CreatePartValidation = {
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
    price: Joi.number().required().messages({
      "any.required": "Price is required",
      "number.base": "Price must be a number",
    }),
    inventory_count: Joi.number().required().messages({
      "any.required": "Inventory count is required",
      "number.base": "Inventory count must be a number",
    }),
    reorder_level: Joi.number().required().messages({
      "any.required": "Reorder level is required",
      "number.base": "Reorder level must be a number",
    }),
  }),
};

// Update Part Validation
export const UpdatePartValidation = {
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
    price: Joi.number().required().messages({
      "any.required": "Price is required",
      "number.base": "Price must be a number",
    }),
    inventory_count: Joi.number().required().messages({
      "any.required": "Inventory count is required",
      "number.base": "Inventory count must be a number",
    }),
    reorder_level: Joi.number().required().messages({
      "any.required": "Reorder level is required",
      "number.base": "Reorder level must be a number",
    }),
  }),
};
