import type { ColumnsType } from "antd/es/table";
import type { ICompra } from "../../../../enums/types";

import useTitle from "../../../../hooks/useTitle";

import { Input, Table, type GetProps } from "antd";
import { ButtonCadastro, SearchContainer } from "./styles";
import PainelPage from "../../../../components/PainelPage";
import { AppstoreAddOutlined, DeleteOutlined, HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { ButtonsTable, ContainerButtonsTable, ContainerTable } from "../../styles";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../../../enums/enums";
import { useAppSelector } from "../../../../redux/hooks";
import { useCompras } from "../../../../hooks/useCompras";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const ComprasDashboard = () => {
  useTitle("Compras");
  const navigate = useNavigate();

  const { deleteCompra, loading } = useCompras();
  const { compras } = useAppSelector((state) => state.globalReducer);

  const itemsCrumb = [
    {
      title: (
        <>
          <HomeOutlined />
          <span>Dashboard</span>
        </>
      ),
      onClick: () => navigate(RoutesEnum.Dashboard),
    },
    {
      title: (
        <>
          <ShoppingCartOutlined />
          <span>Compras</span>
        </>
      ),
      onClick: () => {},
    },
  ];

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value);

  const columns: ColumnsType<ICompra> = [
    { title: "Id", dataIndex: "id", key: "id", width: 10 },
    { title: "Produto", dataIndex: "productName", key: "productName" },
    { title: "Quantidade", dataIndex: "quantity", key: "quantity" },
    { title: "Data", dataIndex: "data", key: "data" },
    {
      title: "Preço",
      dataIndex: "priceBuy",
      key: "priceBuy",
      render: (priceBuy) => (
        <span style={{ color: "#FF5252" }}>
          {priceBuy.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      ),
    },
    {
      title: "Comprador",
      dataIndex: "buyer",
      key: "buyer",
    },
    {
      title: "Ações",
      key: "action",
      fixed: "right",
      render: (compra) => (
        <ContainerButtonsTable>
          <ButtonsTable color="danger" variant="outlined" onClick={() => deleteCompra(compra.id)} loading={loading}>
            <DeleteOutlined />
            <span>Excluir</span>
          </ButtonsTable>
        </ContainerButtonsTable>
      ),
    },
  ];

  return (
    <PainelPage itemsCrumb={itemsCrumb}>
      <SearchContainer>
        <Search placeholder="Digite o nome do produto..." allowClear onSearch={onSearch} />
        <ButtonCadastro variant="outlined" color="primary" icon={<AppstoreAddOutlined />} onClick={() => navigate(RoutesEnum.Cadastrar_Compra)}>
          Novo
        </ButtonCadastro>
      </SearchContainer>

      <ContainerTable>
        <Table<ICompra> rowKey="id" columns={columns} dataSource={compras} pagination={{ pageSize: 10 }} scroll={{ x: "max-content" }} style={{ scrollbarWidth: "none" }} />
      </ContainerTable>
    </PainelPage>
  );
};

export default ComprasDashboard;
