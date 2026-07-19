import api from "./api";

export const getPortfolioSummary = async (email) => {

  const response = await api.get(
    `/portfolio-summary/${email}`
  );

  return response.data;

};