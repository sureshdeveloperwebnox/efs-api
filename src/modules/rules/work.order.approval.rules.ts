import Joi from "joi";

// Create Work Order Approval Validation
export const CreateWorkOrderApprovalValidation = {
  body: Joi.object({
    work_order_id: Joi.number().required().messages({
      "any.required": "Work order ID is required",
      "number.base": "Work order ID must be a number",
    }),
    approved_by: Joi.number().required().messages({
      "any.required": "Approved by is required",
      "number.base": "Approved by must be a number",
    }),
    approval_status: Joi.string().required().messages({
      "any.required": "Work order ID is required",
      "string.base": "Work order ID must be a string",
    }),
  }),
};

// Work Order Approval Validation
export const WorkOrderApprovalValidation = {
  body: Joi.object({
    work_order_id: Joi.number().required().messages({
      "any.required": "Work order ID is required",
      "number.base": "Work order ID must be a number",
    }),
    approved_by: Joi.number().required().messages({
      "any.required": "Approved by is required",
      "number.base": "Approved by must be a number",
    }),
    approval_status: Joi.string().required().messages({
      "any.required": "Work order ID is required",
      "string.base": "Work order ID must be a string",
    }),
  }),
};
