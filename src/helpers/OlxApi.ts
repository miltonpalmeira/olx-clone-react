import { NavigateFunction } from "react-router-dom";
import { ILogin, OptionsQueryAds } from "../types/index";
import Cookies from "js-cookie";
import qs from "qs";

const BASE_API = process.env.REACT_APP_BASE_API;

const apiFetchPost = async (
  endpoint: string,
  body: ILogin,
  navigate: NavigateFunction
) => {
  if (!body.token) {
    let token = Cookies.get("token");
    if (token) body.token = token;
  }
  console.log("body");
  console.log(body);
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

  getStates: async (navigate: NavigateFunction) => {
    const json = await apiFetchGet("/states", {}, navigate);
    return json.states;
  },

  register: async (data: ILogin, navigate: NavigateFunction) => {
    const json = await apiFetchPost(
      "/user/signup",
      {
        name: data.name,
        state: data.state,
        email: data.email,
        password: data.password,
      },
      navigate
    );
    return json;
  },

  getCategories: async (navigate: NavigateFunction) => {
    const json = await apiFetchGet("/categories", {}, navigate);
    return json.categories;
  },

  getAds: async (options: OptionsQueryAds, navigate: NavigateFunction) => {
    const json = await apiFetchGet("/ads/list", options, navigate);
    console.log("json olxapi");
    console.log(json);
    return json;
  },

  getAd: async (id: string | undefined, other = false, navigate: NavigateFunction) => {
    const json = await apiFetchGet("/ad/item", { id, other }, navigate);
    return json;
  },
};

export default () => OlxApi;
