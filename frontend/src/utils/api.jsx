import axios from "axios";
import { LOCAL_URL } from "./constants.jsx";
import { getToken } from "./token.js";

export const postData = async (endpoint, payload) => {
  try {
    const response = await axios.post(LOCAL_URL + endpoint, payload);
    // console.log(response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    return error;
  }
};

export const postSignout = async (endpoint) => {
  try {
    const response = await axios.post(LOCAL_URL + endpoint, "", {
      headers: {
        Authorization: `Bearer ${getToken("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    return error;
  }
};

export const postRefreshAccessToken = async (endpoint) => {
  try {
    const response = await axios.post(
      LOCAL_URL + endpoint,
      {
        refreshToken: getToken("refreshToken"),
      },
      {
        headers: {
          Authorization: `Bearer ${getToken("refreshToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    return error;
  }
};
