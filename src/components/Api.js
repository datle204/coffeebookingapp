import axios from "axios";

const apis = axios.create({
  baseURL: "https://user-coffee.herokuapp.com",
  headers: { Authorization: "token" },
});

const DOMAIN = "https://user-coffee.herokuapp.com";
const STORE_API = DOMAIN + "/store";
const PAGE_LIMIT = 3;

// DISPLAY LIST STORES
export async function getStores(page = 1, sort, order) {
  let sortParam = sort ? `&_sort=${sort}` : "";
  let orderParam = sort ? `&_order=${order}` : "";

  return apis.get(
    `/store?_page=${page}&_limit=${PAGE_LIMIT}${sortParam}${orderParam}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  ).then((res)=>{
    let stores = res.data;
    let totalCount = res.headers["x-total-count"];
    return { stores, totalCount };
  })
}


