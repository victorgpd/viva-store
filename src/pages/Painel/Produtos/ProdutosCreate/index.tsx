import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../../hooks/useTitle";
import { RoutesEnum } from "../../../../enums/enums";
import type { IProduct } from "../../../../enums/types";
import PainelPage from "../../../../components/PainelPage";
import { useProducts } from "../../../../hooks/useProducts";
import { AppstoreAddOutlined, HomeOutlined, ShoppingOutlined } from "@ant-design/icons";

const ProductsCreate = () => {
  useTitle("Cadastrar produto");

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { loading, createProduct } = useProducts();

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
          <span>Produtos</span>
        </>
      ),
      onClick: () => navigate(RoutesEnum.Produtos),
    },
    {
      title: (
        <>
          <AppstoreAddOutlined />
          <span>Cadastrar produto</span>
        </>
      ),
      onClick: () => {},
    },
  ];

  const handleFinish = (values: IProduct) => {
    const product = {
      ...values,
    };

    createProduct(product.name);
    form.resetFields();
  };

  return (
    <PainelPage itemsCrumb={itemsCrumb}>
      <Form form={form} layout="vertical" onFinish={handleFinish} style={{ maxWidth: 600 }}>
        <Form.Item label="Nome do Produto" name="name" rules={[{ required: true, message: "Por favor, insira o nome do produto" }]}>
          <Input placeholder="Ex: Camiseta Nike" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Salvar Produto
          </Button>
        </Form.Item>
      </Form>
    </PainelPage>
  );
};

export default ProductsCreate;
