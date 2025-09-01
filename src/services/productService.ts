import api from "./api";

export const ProductsService = {
  getProductsDetails: async () => {
    const response = await api.get("/products-details");
    return response.data;
  },
  create: async (name: string) => {
    const response = await api.post("/product", { name });
    return response.data;
  },

  remove: async (id: number) => {
    const response = await api.delete(`/product/${id}`);
    return response.data;
  },
};
