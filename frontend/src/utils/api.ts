import axios from "axios";
import Cookies from "universal-cookie/es6";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export function getCurrentAuthToken() {
  const cookie = new Cookies();
  return cookie.get("access_token");
}

export function getTokenType() {
  const cookie = new Cookies();
  return cookie.get("token_type");
}

export async function getMyInfo() {
  const response = await axios({
    url: "/users/me",
    headers: {
      Authorization: getTokenType() + " " + getCurrentAuthToken(),
    },
  });
  return response.data;
}
