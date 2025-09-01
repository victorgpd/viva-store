import type { ICompra } from "../enums/types";
import api from "./api";

export const ComprasService = {
  getCompras: async () => {
    const response = await api.get("/compras");
    return response.data;
  },
  create: async (compra: ICompra) => {
    const response = await api.post("/compras", { ...compra });
    return response.data;
  },

  remove: async (id: number) => {
    const response = await api.delete(`/compras/${id}`);
    return response.data;
  },
};
