import axios from "axios";
import Cookies from "universal-cookie/es6";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export function getCurrentAuthToken() {
  const cookie = new Cookies();
  return cookie.get("access_token") || "";
}

export function getTokenType() {
  const cookie = new Cookies();
  return cookie.get("token_type") || "";
}

export function setCurrentAuthToken(token: string) {
  const cookie = new Cookies();
  return cookie.set("access_token", token);
}

export function setTokenType(tokenType: string) {
  const cookie = new Cookies();
  return cookie.set("token_type", tokenType);
}

export function removeCurrentAuthToken() {
  const cookie = new Cookies();
  return cookie.remove("access_token");
}

export function removeTokenType() {
  const cookie = new Cookies();
  return cookie.remove("token_type");
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

export const signIn = async (form: HTMLFormElement) => {
  const response = await axios.post("/token", new FormData(form));
  const data = response.data;
  setCurrentAuthToken(data.access_token);
  setTokenType(data.token_type);
  return data;
};

export const signOut = async () => {
  removeCurrentAuthToken();
  removeTokenType();
};

export async function submitModelFile(form: HTMLFormElement) {
  const response = await axios({
    url: "/submit",
    method: "post",
    data: new FormData(form),
    headers: {
      Authorization: getTokenType() + " " + getCurrentAuthToken(),
    },
  });

  return response;
}

export async function submitDataInsightsForm(form: HTMLFormElement) {
  const response = await axios({
    url: "/submit-insights",
    method: "post",
    data: new FormData(form),
    headers: {
      Authorization: getTokenType() + " " + getCurrentAuthToken(),
    },
  });

  return response;
}

export async function getMySubmissions() {
  const response = await axios({
    url: "/mysubmissions",
    method: "get",
    headers: {
      Authorization: getTokenType() + " " + getCurrentAuthToken(),
    },
  });

  return response;
}

export async function getPublicLeaderboard() {
  const response = await axios({
    url: "/public-leaderboard",
  });

  return response.data;
}
