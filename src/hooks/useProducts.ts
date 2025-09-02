import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useNotification } from "./useNotification";
import { setProducts } from "../redux/globalReducer/slice";
import { ProductsService } from "../services/productService";

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const notification = useNotification();

  const [loading, setLoading] = useState(false);

  const searchProductsDetails = async () => {
    try {
      const products = await ProductsService.getProductsDetails();

      dispatch(setProducts(products));
    } catch {
      console.error();
    }
  };

  const createProduct = async (name: string) => {
    setLoading(true);

    try {
      await ProductsService.create(name);

      notification.success("Produto criado com sucesso!");
    } catch {
      console.error();
      notification.error("Erro ao criar o produto!");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    setLoading(true);

    try {
      await ProductsService.remove(id);

      notification.success("Produto excluido com sucesso!");
    } catch {
      console.error();
      notification.error("Erro ao excluir o produto!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, searchProductsDetails, createProduct, deleteProduct };
};
