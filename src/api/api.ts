import axios from "axios";
import {
  AUTH,
  GETACCOUNT,
  INSTAGRAMLOGIN,
  LOGOUT,
  POSTSCHEDULE,
  PUBLISHSCHEDULE,
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

//create schedule post

export const postInstagramSchedule = async (body: any) => {
  return await axios.post(`${BASEAPI}${POSTSCHEDULE}?token=${config()}`, body);
};

// update schedule post

export const updateInstagramSchedule = async (id: number, body: any) => {
  return await axios.post(
    `${BASEAPI}${POSTSCHEDULE}/${id}?token=${config()}`,
    body
  );
};

//publish schedule post
export const publishInstagramSchedule = async (id: number, body: any) => {
  return await axios.patch(
    `${BASEAPI}${PUBLISHSCHEDULE}/${id}?token=${config()}`,
    body
  );
};

//get schedule post

export const getInstagramSchedule = async () => {
  return await axios.get(`${BASEAPI}${POSTSCHEDULE}?token=${config()}`);
};

//delete schedule post

export const deleteInstagramSchedule = async (id: number) => {
  return await axios.delete(
    `${BASEAPI}${POSTSCHEDULE}/${id}?token=${config()}`
  );
};
