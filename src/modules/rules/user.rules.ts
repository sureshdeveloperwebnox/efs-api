import Joi from "joi";

// User Params ID Validation Schema
export const userParams = {
  params: Joi.object({
    id: Joi.string().required().messages({
      "any.required": "Id is required",
    }),
  }),
};

// User Register API Validation Schema
export const userRegisterValidationSchema = {
  body: Joi.object({
    first_name: Joi.string().required().messages({
      "any.required": "First name is required",
    }),
    last_name: Joi.string().required().messages({
      "any.required": "Last name is required",
    }),
    organization_id: Joi.number().required().messages({
      "any.required": "Organization id is required",
    }),
    isVerified_Email: Joi.boolean().required().messages({
      "any.required": "Is verified email is required",
    }),
    email: Joi.string().required().messages({
      "any.required": "Email is required",
    }),
    phone: Joi.string().required().messages({
      "any.required": "Phone is required",
    }),
    job_title: Joi.string().required().messages({
      "any.required": "Job title is required",
    }),
    user_type: Joi.string().required().messages({
      "any.required": "User type is required",
    }),
    is_active: Joi.number().required().messages({
      "any.required": "Is active is required",
    }),
    email_verified: Joi.boolean().required().messages({
      "any.required": "Email verified is required",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Created at is required",
    }),
  }),
};

// User Update API Validation Schema
export const userUpdationValidationSchema = {
  body: Joi.object({
    first_name: Joi.string().required().messages({
      "any.required": "First name is required",
    }),
    last_name: Joi.string().required().messages({
      "any.required": "Last name is required",
    }),
    organization_id: Joi.number().required().messages({
      "any.required": "Organization id is required",
    }),
    isVerified_Email: Joi.boolean().required().messages({
      "any.required": "Is verified email is required",
    }),
    isVerified_PhoneNumber: Joi.boolean().required().messages({
        "any.required": "Is verified phone number is required",
      }),
    email: Joi.string().required().messages({
      "any.required": "Email is required",
    }),
    phone: Joi.string().required().messages({
      "any.required": "Phone is required",
    }),
    job_title: Joi.string().required().messages({
      "any.required": "Job title is required",
    }),
    user_type: Joi.string().required().messages({
      "any.required": "User type is required",
    }),
    is_active: Joi.number().required().messages({
      "any.required": "Is active is required",
    }),
    email_verified: Joi.boolean().required().messages({
      "any.required": "Email verified is required",
    }),
    created_at: Joi.string().required().messages({
      "any.required": "Created at is required",
    }),
  }),
};
