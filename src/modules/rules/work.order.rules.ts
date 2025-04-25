import Joi from "joi";

// Create Work Order Validation
export const CreateWorkOrderValidation = {
  body: Joi.object({
    organization_id: Joi.number().required().messages({
      "any.required": "Organization ID is required",
      "number.base": "Organization ID must be a number",
    }),
    customer_id: Joi.number().required().messages({
        "any.required": "Customer ID is required",
        "number.base": "Customer ID must be a number",
      }),
      company_id: Joi.number().required().messages({
        "any.required": "Company ID is required",
        "number.base": "Company ID must be a number",
      }),
      asset_id: Joi.number().required().messages({
        "any.required": "Asset ID is required",
        "number.base": "Asset ID must be a number",
      }),
      maintenance_plan_id: Joi.number().required().messages({
        "any.required": "Maintenance plan ID is required",
        "number.base": "Maintenance plan ID must be a number",
      }),
      title: Joi.string().required().messages({
        "any.required": "Title is required",
        "string.base": "Title must be a string",
      }),
      description: Joi.string().required().messages({
        "any.required": "Description is required",
        "string.base": "Description must be a string",
      }),
      priority: Joi.string().required().messages({
        "any.required": "Priority is required",
        "string.base": "Priority must be a string",
      }),
      status: Joi.string().required().messages({
        "any.required": "Status is required",
        "string.base": "Status must be a string",
      }),
      assigned_to: Joi.number().required().messages({
        "any.required": "Status is required",
        "number.base": "Status must be a number",
      }),
      assigned_crew_id: Joi.number().required().messages({
        "any.required": "Assigned crew id is required",
        "number.base": "Assigned crew id must be a number",
      }),
      scheduled_start_date: Joi.string().required().messages({
        "any.required": "Scheduled start date is required",
        "string.base": "Scheduled start date must be a string",
      }),
      scheduled_end_date: Joi.string().required().messages({
        "any.required": "Scheduled end date is required",
        "string.base": "Scheduled end date must be a string",
      }),
      actual_start_date: Joi.string().required().messages({
        "any.required": "Actual start date is required",
        "string.base": "Actual start date must be a string",
      }),
      actual_end_date: Joi.string().required().messages({
        "any.required": "Actual end date is required",
        "string.base": "Actual end date must be a string",
      }),
      currency_id: Joi.number().required().messages({
        "any.required": "Currency ID is required",
        "number.base": "Currency ID must be a number",
      }),
      estimated_cost: Joi.number().required().messages({
        "any.required": "Estimated cost is required",
        "number.base": "Estimated cost must be a number",
      }),
      actual_cost: Joi.number().required().messages({
        "any.required": "Actual cost is required",
        "number.base": "Actual cost must be a number",
      }),
      address: Joi.string().required().messages({
        "any.required": "Address is required",
        "string.base": "Address must be a string",
      }),
      city: Joi.string().required().messages({
        "any.required": "Address is required",
        "string.base": "Address must be a string",
      }),
      state: Joi.string().required().messages({
        "any.required": "State is required",
        "string.base": "State must be a string",
      }),
      postal_code: Joi.string().required().messages({
        "any.required": "Postal code is required",
        "string.base": "Postal code must be a string",
      }),
      country: Joi.string().required().messages({
        "any.required": "Country is required",
        "string.base": "Country must be a string",
      }),
      is_multi_day: Joi.number().required().messages({
        "any.required": "Is multi day is required",
        "number.base": "Is multi day must be a number",
      }),
  })
};

// Update Work Order Validation
export const UpdateWorkOrderValidation = {
    body: Joi.object({
      organization_id: Joi.number().required().messages({
        "any.required": "Organization ID is required",
        "number.base": "Organization ID must be a number",
      }),
      customer_id: Joi.number().required().messages({
          "any.required": "Customer ID is required",
          "number.base": "Customer ID must be a number",
        }),
        company_id: Joi.number().required().messages({
          "any.required": "Company ID is required",
          "number.base": "Company ID must be a number",
        }),
        asset_id: Joi.number().required().messages({
          "any.required": "Asset ID is required",
          "number.base": "Asset ID must be a number",
        }),
        maintenance_plan_id: Joi.number().required().messages({
          "any.required": "Maintenance plan ID is required",
          "number.base": "Maintenance plan ID must be a number",
        }),
        title: Joi.string().required().messages({
          "any.required": "Title is required",
          "string.base": "Title must be a string",
        }),
        description: Joi.string().required().messages({
          "any.required": "Description is required",
          "string.base": "Description must be a string",
        }),
        priority: Joi.string().required().messages({
          "any.required": "Priority is required",
          "string.base": "Priority must be a string",
        }),
        status: Joi.string().required().messages({
          "any.required": "Status is required",
          "string.base": "Status must be a string",
        }),
        assigned_to: Joi.number().required().messages({
          "any.required": "Status is required",
          "number.base": "Status must be a number",
        }),
        assigned_crew_id: Joi.number().required().messages({
          "any.required": "Assigned crew id is required",
          "number.base": "Assigned crew id must be a number",
        }),
        scheduled_start_date: Joi.string().required().messages({
          "any.required": "Scheduled start date is required",
          "string.base": "Scheduled start date must be a string",
        }),
        scheduled_end_date: Joi.string().required().messages({
          "any.required": "Scheduled end date is required",
          "string.base": "Scheduled end date must be a string",
        }),
        actual_start_date: Joi.string().required().messages({
          "any.required": "Actual start date is required",
          "string.base": "Actual start date must be a string",
        }),
        actual_end_date: Joi.string().required().messages({
          "any.required": "Actual end date is required",
          "string.base": "Actual end date must be a string",
        }),
        currency_id: Joi.number().required().messages({
          "any.required": "Currency ID is required",
          "number.base": "Currency ID must be a number",
        }),
        estimated_cost: Joi.number().required().messages({
          "any.required": "Estimated cost is required",
          "number.base": "Estimated cost must be a number",
        }),
        actual_cost: Joi.number().required().messages({
          "any.required": "Actual cost is required",
          "number.base": "Actual cost must be a number",
        }),
        address: Joi.string().required().messages({
          "any.required": "Address is required",
          "string.base": "Address must be a string",
        }),
        city: Joi.string().required().messages({
          "any.required": "Address is required",
          "string.base": "Address must be a string",
        }),
        state: Joi.string().required().messages({
          "any.required": "State is required",
          "string.base": "State must be a string",
        }),
        postal_code: Joi.string().required().messages({
          "any.required": "Postal code is required",
          "string.base": "Postal code must be a string",
        }),
        country: Joi.string().required().messages({
          "any.required": "Country is required",
          "string.base": "Country must be a string",
        }),
        is_multi_day: Joi.number().required().messages({
          "any.required": "Is multi day is required",
          "number.base": "Is multi day must be a number",
        }),
    })
};