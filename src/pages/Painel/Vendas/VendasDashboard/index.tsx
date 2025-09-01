import type { ColumnsType } from "antd/es/table";
import type { IVenda } from "../../../../enums/types";

import useTitle from "../../../../hooks/useTitle";

import { Input, Table, type GetProps } from "antd";
import PainelPage from "../../../../components/PainelPage";
import { ButtonCadastro, SearchContainer } from "./styles";
import { AppstoreAddOutlined, DeleteOutlined, HomeOutlined, ShoppingOutlined } from "@ant-design/icons";
import { ButtonsTable, ContainerButtonsTable, ContainerTable } from "../../styles";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../../../enums/enums";
import { useVendas } from "../../../../hooks/useVendas";
import { useAppSelector } from "../../../../redux/hooks";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const VendasDashboard = () => {
  useTitle("Vendas");
  const navigate = useNavigate();

  const { deleteVenda, loading } = useVendas();
  const { vendas } = useAppSelector((state) => state.globalReducer);

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
          <ShoppingOutlined />
          <span>Vendas</span>
        </>
      ),
      onClick: () => {},
    },
  ];

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value);

  const columns: ColumnsType<IVenda> = [
    { title: "Id", dataIndex: "id", key: "id", width: 10 },
    { title: "Produto", dataIndex: "productName", key: "productName" },
    { title: "Quantidade", dataIndex: "quantity", key: "quantity" },
    { title: "Data", dataIndex: "data", key: "data" },
    {
      title: "Preço",
      dataIndex: "priceSale",
      key: "priceSale",
      render: (priceSale) => (
        <span style={{ color: "#00C853" }}>
          {priceSale.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      ),
    },
    {
      title: "Método de pagamento",
      dataIndex: "methodPayment",
      key: "methodPayment",
    },
    {
      title: "Ações",
      key: "action",
      fixed: "right",
      render: (venda) => (
        <ContainerButtonsTable>
          <ButtonsTable color="danger" variant="outlined" onClick={() => deleteVenda(venda.id)} loading={loading}>
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
        <ButtonCadastro variant="outlined" color="primary" icon={<AppstoreAddOutlined />} onClick={() => navigate(RoutesEnum.Cadastrar_Venda)}>
          Novo
        </ButtonCadastro>
      </SearchContainer>

      <ContainerTable>
        <Table<IVenda> rowKey="id" columns={columns} dataSource={vendas} pagination={{ pageSize: 10 }} scroll={{ x: "max-content" }} style={{ scrollbarWidth: "none" }} />
      </ContainerTable>
    </PainelPage>
  );
};

export default VendasDashboard;
