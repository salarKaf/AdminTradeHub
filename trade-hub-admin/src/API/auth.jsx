import axios from "axios";
import {iamBaseURL} from './api'
export const loginAdmin = async (username, password) => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");  
  params.append("username", username);
  params.append("password", password);

  const response = await axios.post(`${iamBaseURL}/admins/login`,
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};
