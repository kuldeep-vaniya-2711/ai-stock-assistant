import api from "./api";

export const getDashboard = async (email) => {

    const res = await api.get(`/dashboard/${email}`);

    return res.data;

};