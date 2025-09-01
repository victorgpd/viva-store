import { useNavigate } from "react-router-dom";
import useTitle from "../../../../hooks/useTitle";
import { RoutesEnum } from "../../../../enums/enums";
import type { ICompra } from "../../../../enums/types";
import PainelPage from "../../../../components/PainelPage";
import { Form, Input, Button, InputNumber, DatePicker, Select } from "antd";
import { AppstoreAddOutlined, HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../../redux/hooks";
import { useCompras } from "../../../../hooks/useCompras";

const ComprasCreate = () => {
  useTitle("Cadastrar compra");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { createCompra, loading } = useCompras();
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
          <ShoppingCartOutlined />
          <span>Compras</span>
        </>
      ),
      onClick: () => navigate(RoutesEnum.Compras),
    },
    {
      title: (
        <>
          <AppstoreAddOutlined />
          <span>Cadastrar compra</span>
        </>
      ),
      onClick: () => {},
    },
  ];

  const handleFinish = (values: ICompra) => {
    const priceStr = String(values.priceBuy);
    const compra = {
      ...values,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: (values.data as any).format("YYYY-MM-DD"),
      priceBuy: Number(priceStr.replace(/[^\d]/g, "")) / 100,
    };

    createCompra(compra);

    form.resetFields();
  };

  return (
    <PainelPage itemsCrumb={itemsCrumb}>
      <Form form={form} layout="vertical" onFinish={handleFinish} style={{ maxWidth: 600 }}>
        <Form.Item label="Selecione o produto" name="productId" rules={[{ required: true, message: "Por favor, selecione o produto" }]}>
          <Select
            placeholder="Selecione o produto"
            options={products.map((produto) => ({
              value: produto.id,
              label: `(${produto.id}) ${produto.name}`,
            }))}
            onChange={(productId) => {
              const produtoSelecionado = products.find((p) => p.id === productId);

              form.setFieldsValue({
                productName: produtoSelecionado ? produtoSelecionado.name : "",
              });
            }}
          />
        </Form.Item>

        <Form.Item label="Nome do Produto" name="productName" rules={[{ required: true, message: "Por favor, insira o nome do produto" }]}>
          <Input placeholder="Ex: Camiseta Nike" disabled />
        </Form.Item>

        <Form.Item label="Quantidade" name="quantity" rules={[{ required: true, message: "Por favor, insira a quantidade" }]}>
          <InputNumber placeholder="Ex: 2" style={{ width: "100%" }} min={1} />
        </Form.Item>

        <Form.Item label="Data da Compra" name="data" rules={[{ required: true, message: "Por favor, selecione a data da compra" }]}>
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} placeholder="Selecione a data" />
        </Form.Item>

        <Form.Item label="Preço de Compra (R$)" initialValue="R$ 0,00" name="priceBuy" rules={[{ required: true, message: "Por favor, insira o valor da compra" }]}>
          <Input
            value={form.getFieldValue("priceBuy") ?? "R$ 0,00"}
            onChange={(e) => {
              let val = e.target.value.replace(/[^\d]/g, "");
              while (val.length < 3) val = "0" + val;
              const reais = val.slice(0, -2).replace(/^0+/, "") || "0";
              const centavos = val.slice(-2);
              form.setFieldsValue({ priceBuy: `R$ ${reais},${centavos}` });
            }}
          />
        </Form.Item>

        <Form.Item label="Comprador" name="buyer" rules={[{ required: true, message: "Por favor, insira o nome do comprador" }]}>
          <Input placeholder="Ex: João da Silva" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Salvar Compra
          </Button>
        </Form.Item>
      </Form>
    </PainelPage>
  );
};

export default ComprasCreate;
