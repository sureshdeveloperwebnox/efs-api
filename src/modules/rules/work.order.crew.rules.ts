import Joi from "joi";

// Create Work Order Crew Validation
export const CreateWorkOrderCrewValidation = {
  body: Joi.object({
    work_order_id: Joi.number().required().messages({
      "any.required": "Work order ID is required",
      "number.base": "Work order ID must be a number",
    }),
    crew_id: Joi.number().required().messages({
      "any.required": "Crew ID is required",
      "number.base": "Crew ID must be a number",
    }),
    assigned_at: Joi.string().required().messages({
      "any.required": "Assigned at is required",
      "string.base": "Assigned at must be a string",
    }),
  }),
};


// Update Work Order Crew Validation
export const UpdateWorkOrderCrewValidation = {
    body: Joi.object({
      work_order_id: Joi.number().required().messages({
        "any.required": "Work order ID is required",
        "number.base": "Work order ID must be a number",
      }),
      crew_id: Joi.number().required().messages({
        "any.required": "Crew ID is required",
        "number.base": "Crew ID must be a number",
      }),
      assigned_at: Joi.string().required().messages({
        "any.required": "Assigned at is required",
        "string.base": "Assigned at must be a string",
      }),
    }),
  };
  