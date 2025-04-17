// Equipments

import Joi from "joi";

// Create Equipments Validation
export const CreateEquipmentValidation = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization ID is required",
      "number.base": "Organization ID must be a number",
    }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.base": "Name must be a string",
    }),
    equipment_type: Joi.string().required().messages({
      "any.required": "Equipment type is required",
      "string.base": "Equipment type must be a string",
    }),
    status: Joi.string().required().messages({
      "any.required": "Status is required",
      "string.base": "Status must be a string",
    }),
    location: Joi.string().required().messages({
      "any.required": "Location is required",
      "string.base": "Location must be a string",
    }),
    availability_date: Joi.string().required().messages({
      "any.required": "Availablity date is required",
      "string.base": "Availablity date must be a string",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Availablity date is required",
      "string.base": "Availablity date must be a string",
    }),
  }),
};

// Update Equipment Validation
export const UpdateEquipmentValidation = {
  body: Joi.object({
    id: Joi.number().required().messages({
      "any.required": "ID is required",
      "number.base": "ID must be a number",
    }),
    organization_id: Joi.number().required().messages({
      "any.required": "Organization ID is required",
      "number.base": "Organization ID must be a number",
    }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.base": "Name must be a string",
    }),
    equipment_type: Joi.string().required().messages({
      "any.required": "Equipment type is required",
      "string.base": "Equipment type must be a string",
    }),
    status: Joi.string().required().messages({
      "any.required": "Status is required",
      "string.base": "Status must be a string",
    }),
    location: Joi.string().required().messages({
      "any.required": "Location is required",
      "string.base": "Location must be a string",
    }),
    availability_date: Joi.string().required().messages({
      "any.required": "Availablity date is required",
      "string.base": "Availablity date must be a string",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Availablity date is required",
      "string.base": "Availablity date must be a string",
    }),
  }),
};
