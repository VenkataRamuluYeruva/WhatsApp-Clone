import axios from "axios";

const Api_url = process.env.REACT_APP_API_URL;

if (!Api_url) {
  console.error("API URL is not defined in the environment variables.");
}

const Api_Axios = axios.create({
  baseURL: Api_url,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Login Service
 * Handles user authentication by sending a POST request to the server.
 * 
 * @param {Object} payload - The login data containing email and password.
 * @returns {Object} - Response or error from the API call.
 */
export async function LoginService(payload) {
  try {
    const response = await Api_Axios.post("/authentication/login", payload);
    return response; 
  } 
  catch (error) {
    
    if (error) {
      return error.response;
    }
  }
}

export async function RegisterService(payload){
  try {
    const response = await Api_Axios.post("/authentication/signup", payload);
    return response; 
  } 
  catch (error) {

    if (error) {
      return error;
    }
  }
}

export async function UsersService(userId){
  try {
    const response = await Api_Axios.get(`/chat/otherusers/${userId}`);
    return response; 
  } 
  catch (error) {
    if (error) {
      return error;
    }
  }
}