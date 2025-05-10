import {
  recipesUrl,
  recipesUrlSearch,
  recipesUrlInformation,
  recipesUrlPrice,
  generateUrlApi,
  generateUrlBackend,
  addCartUrl,
  getCartUrl,
  removeFromCartUrl,
} from "../url";
import { getService, postService } from "../http.service";

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

const addToCart = async (data) => {
  const url = generateUrlBackend(addCartUrl);
  return postService(url, data);
};

const getFromCart = async (username) => {
  const url = generateUrlBackend(getCartUrl);
  return postService(url, username);
};

const removeFromCart = async (data) => {
  const url = generateUrlBackend(removeFromCartUrl);
  return postService(url, data);
};

export {
  getPopularService,
  getCousineComplexSearch,
  getRecipesInformation,
  getRecipesPrice,
  addToCart,
  getFromCart,
  removeFromCart,
};
