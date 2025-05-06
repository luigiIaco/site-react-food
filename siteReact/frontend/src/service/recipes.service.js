import {
  recipesUrl,
  recipesUrlSearch,
  recipesUrlInformation,
  recipesUrlPrice,
  generateUrlBackend,
  loginUrl,
} from "./url";
import { generateUrlApi, registerUrl } from "./url";
import { getService,postUserData } from "./http.service";

const getRecipesInformation = async (id) => {
  const url = generateUrlApi(recipesUrlInformation(id));
  return getService(url);
};

const getRecipesPrice = async (id) => {
  const url = generateUrlApi(recipesUrlPrice(id));
  return getService(url);
};

const getPopularService = async (n, tags) => {
  const params = [
    { key: "number", value: n },
    { key: "tags", value: tags },
  ];

  const url = generateUrlApi(recipesUrl, params);
  return getService(url);
};

const getCousineComplexSearch = async (n, cuisine, query = "") => {
  const params = [
    { key: "number", value: n },
    { key: "cuisine", value: cuisine },
    { key: "query", value: query },
  ];
  const url = generateUrlApi(recipesUrlSearch, params);
  return getService(url);
};

const register = async (username, password) => {
  const url = generateUrlBackend(registerUrl);
  return postUserData(url, username, password);
};

const login = async (username, password, remember) => {
  const url = generateUrlBackend(loginUrl);
  return postUserData(url, username, password, remember);
};

export {
  getPopularService,
  getCousineComplexSearch,
  getRecipesInformation,
  getRecipesPrice,
  register,
  login
};
