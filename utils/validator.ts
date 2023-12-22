import joi from "joi";

export const createUserValidator = joi.object({
  email: joi.string().email().lowercase().trim().required(),
  password: joi.string().required(),
  confirm: joi.ref("password"),
});

export const createStudentValidator = joi.object({
  email: joi.string().email().lowercase().trim().required(),
  password: joi.string().required(),
  confirm: joi.ref("password"),
});

export const signInUserValidator = joi.object({
  email: joi.string().email().lowercase().trim().required(),
  password: joi.string().required(),
});

export const signInStudentValidator = joi.object({
  email: joi.string().email().lowercase().trim().required(),
  password: joi.string().required(),
});

export const resetPassword = joi.object({
  email: joi.string().email().lowercase().trim().required(),
});

export const changeValidator = joi.object({
  password: joi.string().required(),
});

export const inputOTP = joi.object({
  token: joi.string().required(),
});
