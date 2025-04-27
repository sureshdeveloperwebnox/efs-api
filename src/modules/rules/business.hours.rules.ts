import Joi from "joi";

// Create Business Hours Validation
export const CreateBusinessHoursValidation = {
    body: Joi.object({
        organization_id: Joi.number().required().messages({
            "any.required": "Organization ID is required",
            "number.base": "Organization ID must be a number",
        }),
        day_of_week: Joi.string().required().messages({
            "any.required": "Day of week is required",
            "string.base": "Day of week must be a string",
        }),
        start_time: Joi.string().required().messages({
            "any.required": "Start time is required",
            "string.base": "Start time must be a string",
        }),
        end_time: Joi.string().required().messages({
            "any.required": "End time is required",
            "string.base": "End time must be a string",
        }),
    })
};

// Update Business Hours Validation
export const UpdateBusinessHoursValidation = {
    body: Joi.object({
        organization_id: Joi.number().required().messages({
            "any.required": "Organization ID is required",
            "number.base": "Organization ID must be a number",
        }),
        day_of_week: Joi.string().required().messages({
            "any.required": "Day of week is required",
            "string.base": "Day of week must be a string",
        }),
        start_time: Joi.string().required().messages({
            "any.required": "Start time is required",
            "string.base": "Start time must be a string",
        }),
        end_time: Joi.string().required().messages({
            "any.required": "End time is required",
            "string.base": "End time must be a string",
        }),
    })
};