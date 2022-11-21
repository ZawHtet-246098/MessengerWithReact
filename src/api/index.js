import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const register = (formValues) => API.post("/user/signup", formValues);

export const login = (loginFormValues) =>
  API.post("/user/login", loginFormValues);

export const sendEmail = (resetGmail) =>
  API.post("resetPassword/sendmail", resetGmail);

export const otpvalidation = (emailAndotp) =>
  API.post("resetPassword/validateOTP", emailAndotp);

export const changepws = (updatePasswordData) =>
  API.post("resetPassword/changepws", updatePasswordData);
