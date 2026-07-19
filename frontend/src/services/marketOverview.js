import api from "./api";

export const getTopGainers = async () => {

  const response = await api.get(
    "/market/top-gainers"
  );

  return response.data;

};

export const getTopLosers = async () => {

  const response = await api.get(
    "/market/top-losers"
  );

  return response.data;

};

export const getTrendingStocks = async () => {

  const response = await api.get(
    "/market/trending"
  );

  return response.data;

};

export const getMostActiveStocks = async () => {

  const response = await api.get(
    "/market/most-active"
  );

  return response.data;

};