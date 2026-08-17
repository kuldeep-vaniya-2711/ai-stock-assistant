import api from "./api";


// ----------------------------
// Buy Stock
// ----------------------------
export async function buyStock(

  email,

  symbol,

  quantity,

  buy_price

) {

  const { data } = await api.post(

    "/portfolio/buy",

    {

      email,

      symbol,

      quantity,

      buy_price

    }

  );

  return data;

}


// ----------------------------
// Sell Stock
// ----------------------------
export async function sellStock(

  email,

  symbol,

  quantity,

  buy_price

) {

  const { data } = await api.post(

    "/portfolio/sell",

    {

      email,

      symbol,

      quantity,

      buy_price

    }

  );

  return data;

}


// ----------------------------
// Portfolio
// ----------------------------
export async function getPortfolio(email) {

  const { data } = await api.get(

    `/portfolio/${email}`

  );

  return data;

}