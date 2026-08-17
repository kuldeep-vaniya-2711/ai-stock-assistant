import api from "./api";

export async function getDashboard(email) {

  const { data } = await api.get(

    `/dashboard/${email}`

  );

  return data;

}