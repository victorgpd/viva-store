import { useState } from "react";
import type { ICompra } from "../enums/types";
import { useAppDispatch } from "../redux/hooks";
import { useNotification } from "./useNotification";
import { setCompras } from "../redux/globalReducer/slice";
import { ComprasService } from "../services/compraService";

export const useCompras = () => {
  const dispatch = useAppDispatch();
  const notification = useNotification();

  const [loading, setLoading] = useState(false);

  const getCompras = async () => {
    try {
      const compras = await ComprasService.getCompras();

      dispatch(setCompras(compras));
    } catch {
      console.error();
    }
  };

  const createCompra = async (compra: ICompra) => {
    setLoading(true);

    try {
      await ComprasService.create(compra);

      notification.success("Compra adicionada com sucesso!");
    } catch {
      console.error();
      notification.error("Erro ao adicionar a compra!");
    } finally {
      setLoading(false);
    }
  };

  const deleteCompra = async (id: number) => {
    setLoading(true);

    try {
      await ComprasService.remove(id);

      notification.success("Compra excluida com sucesso!");
    } catch {
      console.error();
      notification.error("Erro ao excluir a compra!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, getCompras, createCompra, deleteCompra };
};
