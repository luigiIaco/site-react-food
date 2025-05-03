import {
  recipesUrl,
  recipesUrlSearch,
  recipesUrlInformation,
  recipesUrlPrice,
} from "./url";
import { generateUrl } from "./url";
import { getService } from "./http.service";

const getRecipesInformation = async (id) => {
  const url = generateUrl(recipesUrlInformation(id));
  return getService(url);
};

const getRecipesPrice = async (id) => {
  const url = generateUrl(recipesUrlPrice(id));
  return getService(url);
};

const getPopularService = async (n, tags) => {
  const params = [
    { key: "number", value: n },
    { key: "tags", value: tags },
  ];

  const url = generateUrl(recipesUrl, params);
  return getService(url);
};

const getCousineComplexSearch = async (n, cuisine, query = "") => {
  const params = [
    { key: "number", value: n },
    { key: "cuisine", value: cuisine },
    { key: "query", value: query },
  ];
  const url = generateUrl(recipesUrlSearch, params);
  return getService(url);
};

export {
  getPopularService,
  getCousineComplexSearch,
  getRecipesInformation,
  getRecipesPrice,
};
