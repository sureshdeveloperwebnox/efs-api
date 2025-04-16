import Joi from "joi";

export const TimeoffRequestValidationSchema = {
  body: Joi.object({
    user_id: Joi.number().required().messages({
      "any.required": "User id is required",
    }),
    start_date: Joi.string().required().messages({
      "any.required": "Start date is required",
    }),
    end_date: Joi.string().required().messages({
      "any.required": "Date date is required",
    }),
    reason: Joi.string().required().messages({
      "any.required": "Reason is required",
    }),
    status: Joi.string().required().messages({
      "any.required": "Status is required",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Created at is required",
    }),
  }),
};

export const UpdateTimeoffRequestValidationSchema = {
  body: Joi.object({
    status: Joi.string().required().messages({
      "any.required": "Status is required",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Created at is required",
    }),
  }),
};
