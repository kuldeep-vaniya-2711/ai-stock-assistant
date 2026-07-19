import api from "./api";

export const createAlert = async (
  email,
  symbol,
  target_price,
  condition
) => {

  const response = await api.post(
    "/price-alert/create",
    {
      email,
      symbol,
      target_price,
      condition,
    }
  );

  return response.data;
};

export const getAlerts = async (email) => {

  const response = await api.get(
    `/price-alert/${email}`
  );

  return response.data;
};

export const deleteAlert = async (
  email,
  symbol,
  target_price
) => {

  const response = await api.delete(
    "/price-alert/delete",
    {
      params: {
        email,
        symbol,
        target_price,
      },
    }
  );

  return response.data;
};