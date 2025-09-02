import { useState } from "react";
import type { IVenda } from "../enums/types";
import { useAppDispatch } from "../redux/hooks";
import { useNotification } from "./useNotification";
import { setVendas } from "../redux/globalReducer/slice";
import { VendasService } from "../services/vendasService";

export const useVendas = () => {
  const dispatch = useAppDispatch();
  const notification = useNotification();

  const [loading, setLoading] = useState(false);

  const getVendas = async () => {
    try {
      const vendas = await VendasService.getVendas();

      dispatch(setVendas(vendas));
    } catch {
      console.error();
    }
  };

  const createVenda = async (venda: IVenda) => {
    setLoading(true);

    try {
      await VendasService.create(venda);

      notification.success("Venda adicionada com sucesso!");
    } catch {
      console.error();
      notification.error("Erro ao adicionar a venda!");
    } finally {
      setLoading(false);
    }
  };

  const deleteVenda = async (id: number) => {
    setLoading(true);

    try {
      await VendasService.remove(id);

      notification.success("Venda excluida com sucesso!");
    } catch {
      console.error();
      notification.error("Erro ao excluir a venda!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, getVendas, createVenda, deleteVenda };
};
