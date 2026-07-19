import api from "./api";

export const getProfile = async (email) => {
  const response = await api.get(`/user/profile/${email}`);
  return response.data;
};