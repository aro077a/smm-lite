import axios from "axios";
import {
  AUTH,
  GETACCOUNT,
  INSTAGRAMLOGIN,
  LOGOUT,
  SIGNIN,
  SIGNUP,
} from "../utils/constants";

const BASEAPI = process.env.REACT_APP_BASEURL;

export const config = () => {
  return localStorage.getItem("token");
};

// User auth

export const signUp = async (body: any) => {
  return await axios.post(`${BASEAPI}${AUTH}${SIGNUP}`, body);
};

export const signIn = async (body: any) => {
  return await axios.post(`${BASEAPI}${AUTH}${SIGNIN}`, body);
};

export const logoutUser = async () => {
  return await axios.post(`${BASEAPI}${AUTH}${LOGOUT}?token=${config()}`);
};

//instagram user credentials login

export const instaLogin = async (body: any) => {
  return await axios.post(
    `${BASEAPI}${INSTAGRAMLOGIN}?token=${config()}`,
    body
  );
};

//instagram user account

export const getUserAccount = async () => {
  return await axios.get(`${BASEAPI}${GETACCOUNT}?token=${config()}`);
};
