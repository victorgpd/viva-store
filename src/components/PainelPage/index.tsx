import { Breadcrumb } from "antd";
import { useEffect, type ReactNode } from "react";
import { ContainerPainel } from "./styles";
import { useProducts } from "../../hooks/useProducts";
import { useCompras } from "../../hooks/useCompras";
import { useVendas } from "../../hooks/useVendas";

interface PainelPage {
  children: ReactNode;
  itemsCrumb: { onClick: () => void; title: ReactNode }[];
}

const PainelPage = ({ children, itemsCrumb }: PainelPage) => {
  const { searchProductsDetails } = useProducts();
  const { getCompras } = useCompras();
  const { getVendas } = useVendas();

  useEffect(() => {
    const atualizarDados = () => {
      searchProductsDetails();
      getCompras();
      getVendas();
    };

    atualizarDados();

    const socket = new WebSocket("ws://https://unified-muskrat-known.ngrok-free.app");

    socket.onopen = () => {
      console.log("✅ Conectado ao WebSocket");
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (["NOVA_COMPRA", "DELETE_COMPRA", "NOVA_VENDA", "DELETE_VENDA", "UPDATE_PRODUTO"].includes(msg.type)) {
        atualizarDados();
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <ContainerPainel>
      <Breadcrumb items={itemsCrumb.map((item) => ({ ...item, href: "" }))} style={{ marginBottom: "20px" }} />
      {children}
    </ContainerPainel>
  );
};

export default PainelPage;
