import api from "./api";

export const getTransactions = async (email) => {

  const response = await api.get(
    `/transactions/${email}`
  );

  return response.data;

};