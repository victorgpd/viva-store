import type { IVenda } from "../enums/types";
import api from "./api";

export const VendasService = {
  getVendas: async () => {
    const response = await api.get("/vendas");
    return response.data;
  },
  create: async (venda: IVenda) => {
    const response = await api.post("/vendas", { ...venda });
    return response.data;
  },

  remove: async (id: number) => {
    const response = await api.delete(`/vendas/${id}`);
    return response.data;
  },
};
