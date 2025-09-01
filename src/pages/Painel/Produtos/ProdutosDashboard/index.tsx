import type { ColumnsType } from "antd/es/table";
import type { IProduct } from "../../../../enums/types";

import useTitle from "../../../../hooks/useTitle";

import { useNavigate } from "react-router-dom";
import { Input, Table, type GetProps } from "antd";
import { RoutesEnum } from "../../../../enums/enums";
import { useAppSelector } from "../../../../redux/hooks";
import PainelPage from "../../../../components/PainelPage";
import { ButtonCadastro, SearchContainer } from "./styles";
import { useProducts } from "../../../../hooks/useProducts";
import { ButtonsTable, ContainerButtonsTable, ContainerTable } from "../../styles";
import { AppstoreAddOutlined, DeleteOutlined, HomeOutlined, ShoppingCartOutlined, ShoppingOutlined, UnorderedListOutlined } from "@ant-design/icons";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const ProdutosDashboard = () => {
  useTitle("Produtos");

  const navigate = useNavigate();

  const { loading, deleteProduct } = useProducts();
  const { products } = useAppSelector((state) => state.globalReducer);

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
          <UnorderedListOutlined />
          <span>Produtos</span>
        </>
      ),
      onClick: () => {},
    },
  ];

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value);

  const columns: ColumnsType<IProduct> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Produto",
      dataIndex: "name",
      key: "name",
      width: 600,
      ellipsis: {
        showTitle: true,
      },
    },
    { title: "Estoque", dataIndex: "stock", key: "stock" },
    { title: "Estoque atual", dataIndex: "currentStock", key: "currentStock" },
    {
      title: "Preço de compra",
      dataIndex: "priceBuy",
      key: "priceBuy",
      render: (priceBuy) => (
        <span>
          {priceBuy.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      ),
    },
    {
      title: "Margem de lucro",
      dataIndex: "marginSale",
      key: "marginSale",
      render: (_, record: IProduct) => {
        const { priceSale, priceBuy } = record;

        if (!priceSale || !priceBuy) {
          return <span style={{ color: "#9E9E9E" }}>0%</span>;
        }

        const marginSale = ((priceSale - priceBuy) / priceSale) * 100;
        const color = marginSale < 0 ? "#FF5252" : "#00C853";

        return <span style={{ color }}>{marginSale.toFixed(2)}%</span>;
      },
    },
    {
      title: "Preço de venda (média)",
      dataIndex: "priceSale",
      key: "priceSale",
      render: (priceSale) => (
        <span>
          {priceSale.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      ),
    },
    {
      title: "Ações",
      key: "action",
      render: (produto) => (
        <ContainerButtonsTable>
          <ButtonsTable color="danger" variant="outlined" loading={loading} onClick={() => deleteProduct(produto.id)}>
            <DeleteOutlined />
            <span>Excluir</span>
          </ButtonsTable>
        </ContainerButtonsTable>
      ),
    },
    {
      title: "Ações",
      key: "action",
      fixed: "right",
      width: "150px",
      render: () => (
        <ContainerButtonsTable>
          <ButtonsTable color="green" variant="outlined" loading={loading} onClick={() => navigate(RoutesEnum.Cadastrar_Venda)}>
            <ShoppingOutlined />
          </ButtonsTable>
          <ButtonsTable color="orange" variant="outlined" loading={loading} onClick={() => navigate(RoutesEnum.Cadastrar_Compra)}>
            <ShoppingCartOutlined />
          </ButtonsTable>
        </ContainerButtonsTable>
      ),
    },
  ];

  return (
    <PainelPage itemsCrumb={itemsCrumb}>
      <SearchContainer>
        <Search placeholder="Digite o nome do produto..." allowClear onSearch={onSearch} />
        <ButtonCadastro variant="outlined" color="primary" icon={<AppstoreAddOutlined />} onClick={() => navigate(RoutesEnum.Cadastrar_Produto)}>
          Novo
        </ButtonCadastro>
      </SearchContainer>

      <ContainerTable>
        <Table<IProduct> rowKey="id" columns={columns} dataSource={products} pagination={{ pageSize: 10 }} scroll={{ x: "max-content" }} style={{ scrollbarWidth: "none" }} />
      </ContainerTable>
    </PainelPage>
  );
};

export default ProdutosDashboard;
