import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .min(6, "Password should be a minimum length of 6")
    .max(15, "Password should be a maximum length of 15")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .min(6, "Password should be a minimum length of 6")
    .max(15, "Password should be a maximum length of 15")
    .required("Password is required"),
});
export interface LoginValues {
  email: string;
  password: string;
}
