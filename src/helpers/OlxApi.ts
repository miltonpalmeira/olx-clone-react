import { NavigateFunction } from "react-router-dom";
import { ISignIn } from "../types/index";
import Cookies from "js-cookie";
import qs from "qs";

const BASE_API = process.env.REACT_APP_BASE_API;

const apiFetchPost = async (
  endpoint: string,
  body: ISignIn,
  navigate: NavigateFunction
) => {
  if (!body.token) {
    let token = Cookies.get("token");
    if (token) body.token = token;
  }
  const res = await fetch(BASE_API + endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();

  if (json.notAllowed) {
    navigate("/signin");
    return;
  }

  return json;
};

const apiFetchGet = async (
  endpoint: string,
  body: { [key: string]: any } = {},
  navigate: NavigateFunction
) => {
  if (!body.token) {
    let token = Cookies.get("token");
    if (token) body.token = token;
  }
  const res = await fetch(`${BASE_API + endpoint}?${qs.stringify(body)}`);

  const json = await res.json();

  if (json.notAllowed) {
    navigate("/signin");
    return;
  }

  return json;
};

const OlxApi = {
  login: async (
    email: string,
    password: string,
    navigate: NavigateFunction
  ) => {
    const json = await apiFetchPost(
      "/user/signin",
      {
        email,
        password,
      },
      navigate
    );
    return json;
  },
};

export default () => OlxApi;
