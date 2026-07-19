import api from "./api";

export const buyStock = async (
  email,
  symbol,
  quantity,
  buy_price
) => {

  const response = await api.post("/portfolio/buy", {
    email,
    symbol,
    quantity,
    buy_price,
  });

  return response.data;
};

export const sellStock = async (
  email,
  symbol,
  quantity,
  buy_price
) => {

  const response = await api.post("/portfolio/sell", {
    email,
    symbol,
    quantity,
    buy_price,
  });

  return response.data;
};

export const getPortfolio = async (email) => {

  const response = await api.get(
    `/portfolio/${email}`
  );

  return response.data;
};