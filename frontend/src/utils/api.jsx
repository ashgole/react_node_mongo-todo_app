import axios from "axios";
import { LOCAL_URL} from "./constants.jsx";

export const postData = async (endpoint,payload) => {
  try {
    const response = await axios.post(LOCAL_URL + endpoint, payload);
    // console.log(response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    return error;
  }
};
