import api from "./api";

export const getPortfolioGrowth = async (email) => {

    const response = await api.get(
        `/portfolio-growth/${email}`
    );

    return response.data;

};