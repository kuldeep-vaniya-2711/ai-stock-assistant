import api from "./api";

export const addToWatchlist = async (email, symbol) => {
  const response = await api.post("/watchlist/add", {
    email,
    symbol,
  });

  return response.data;
};

export const getWatchlist = async (email) => {
  const response = await api.get(`/watchlist/${email}`);
  return response.data;
};

export const removeFromWatchlist = async (email, symbol) => {
  const response = await api.delete("/watchlist/remove", {
    params: {
      email,
      symbol,
    },
  });

  return response.data;
};