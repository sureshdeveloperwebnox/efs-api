import Joi from "joi";

// Create Maintenance Plan Asset
export const CreateMaintenancePlanAssetValidation = {
  body: Joi.object({
    maintenance_plan_id: Joi.number().required().messages({
      "any.required": "Maintenance plan id is required",
      "number.base": "Maintenance plan id must be a number",
    }),
    asset_id: Joi.number().required().messages({
      "any.required": "Asset id is required",
      "number.base": "Asset id must be a number",
    }),
    assigned_at: Joi.string().required().messages({
      "any.required": "Assigned at is required",
      "string.base": "Assigned at must be a string",
    }),
  }),
};

// Update Maintenance Plan Asset
export const UpdateMaintenancePlanAssetValidation = {
  body: Joi.object({
    maintenance_plan_id: Joi.number().required().messages({
        "any.required": "Maintenance plan id is required",
        "number.base": "Maintenance plan id must be a number",
      }),
      asset_id: Joi.number().required().messages({
        "any.required": "Asset id is required",
        "number.base": "Asset id must be a number",
      }),
      assigned_at: Joi.string().required().messages({
        "any.required": "Assigned at is required",
        "string.base": "Assigned at must be a string",
      }),
  }),
};
