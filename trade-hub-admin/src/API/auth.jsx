import axios from "axios";

export const loginAdmin = async (username, password) => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");  // اگه سرورت FastAPI OAuth2 باشه این ضروریه
  params.append("username", username);
  params.append("password", password);

  const response = await axios.post(
    "http://iam.localhost/api/v1/admins/login",
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};
