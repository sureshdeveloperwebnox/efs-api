import Joi from 'joi';

// User Login Validation Schema
export const Login = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required'
    })
  })
};

// Organization User Registration API Validation Schema
export const OrganizationUserRegisterValidation = {
  body: Joi.object({
    email: Joi.string().required().messages({
      'any.required': 'Email is required'
    }),
    organization_id: Joi.number().required().messages({
      'any.required': 'Organization id is required'
    }),
    isVerified_Email: Joi.boolean().required().messages({
      'any.required': 'Is Verified Email is required'
    }),
    isVerified_PhoneNumber: Joi.boolean().required().messages({
      'any.required': 'Is Verified Phone Number is required'
    }),
    first_name: Joi.string().required().messages({
      'any.required': 'First name is required'
    }),
    last_name: Joi.string().required().messages({
      'any.required': 'Last name is required'
    }),
    phone: Joi.string().required().messages({
      'any.required': 'Phone is required'
    }),
    job_title: Joi.string().required().messages({
      'any.required': 'Job title is required'
    }),
    user_type: Joi.string().required().messages({
      'any.required': 'User type is required'
    }),
    is_active: Joi.number().required().messages({
      'any.required': 'Is active is required'
    }),
    email_verified: Joi.boolean().required().messages({
      'any.required': 'Email verified is required'
    }),
    created_at: Joi.string().required().messages({
      'any.required': 'Created at is required'
    }),
    updated_at: Joi.string().required().messages({
      'any.required': 'Updated at is required'
    }),
  })
};



