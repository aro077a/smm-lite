import axios from "axios";
import { AUTH, LOGOUT, SIGNIN, SIGNUP } from "../utils/constants";

const BASEAPI = process.env.REACT_APP_BASEURL;

// export const config = () => {
//   return {
//     headers: {
//       "Access-Control-Allow-Origin": "http://localhost:3000",
//     },
//   };
// };

export const signUp = async (body: any) => {
  return await axios.post(`${BASEAPI}${AUTH}${SIGNUP}`, body);
};

export const signIn = async (body: any) => {
  return await axios.post(`${BASEAPI}${AUTH}${SIGNIN}`, body);
};

export const logoutUser = async (body: any) => {
  return await axios.post(`${BASEAPI}${AUTH}${LOGOUT}`, body);
};
