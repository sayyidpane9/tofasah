import axios from "axios";
import { useEffect } from "react";
import { useProductContext } from "..";
const network = axios.create({
  baseURL: "https://dummyjson.com/",
});
export default function useProducts() {
  const { setProducts, products } = useProductContext();
 
  const search = async (keyword) => {
    try {
      const response = await network.get(`/products/search`, {
        params: {
          q: keyword,
        },
      });
      // console.log(response.data.products[]);
      setProducts(response.data.products);
    } catch (error) {

      console.log("error bang > ", error);
    }
  };
  // const detail = async () => {};

  return {
    products,
    search,
  };
}
