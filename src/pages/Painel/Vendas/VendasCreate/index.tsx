import { useNavigate } from "react-router-dom";
import useTitle from "../../../../hooks/useTitle";
import { RoutesEnum } from "../../../../enums/enums";
import PainelPage from "../../../../components/PainelPage";
import { Form, Input, Button, InputNumber, DatePicker, Select } from "antd";
import { AppstoreAddOutlined, HomeOutlined, ShoppingOutlined } from "@ant-design/icons";
import type { IVenda } from "../../../../enums/types";
import { useVendas } from "../../../../hooks/useVendas";
import { useAppSelector } from "../../../../redux/hooks";

const { Option } = Select;

const VendasCreate = () => {
  useTitle("Cadastrar venda");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { products } = useAppSelector((state) => state.globalReducer);
  const { createVenda, loading } = useVendas();

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
      onClick: () => navigate(RoutesEnum.Vendas),
    },
    {
      title: (
        <>
          <AppstoreAddOutlined />
          <span>Cadastrar venda</span>
        </>
      ),
      onClick: () => {},
    },
  ];

  const handleFinish = (values: IVenda) => {
    const priceStr = String(values.priceSale);
    const venda = {
      ...values,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: (values.data as any).format("YYYY-MM-DD"),
      priceSale: Number(priceStr.replace(/[^\d]/g, "")) / 100,
    };

    createVenda(venda);
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

        <Form.Item label="Data da Venda" name="data" rules={[{ required: true, message: "Por favor, selecione a data da venda" }]}>
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} placeholder="Selecione a data" />
        </Form.Item>

        <Form.Item label="Preço da Venda (R$)" initialValue={"R$ 0,00"} name="priceSale" rules={[{ required: true, message: "Por favor, insira o valor da venda" }]}>
          <Input
            value={form.getFieldValue("priceSale") ?? "R$ 0,00"}
            onChange={(e) => {
              let val = e.target.value.replace(/[^\d]/g, "");
              while (val.length < 3) val = "0" + val;
              const reais = val.slice(0, -2).replace(/^0+/, "") || "0";
              const centavos = val.slice(-2);
              form.setFieldsValue({ priceSale: `R$ ${reais},${centavos}` });
            }}
          />
        </Form.Item>

        <Form.Item label="Método de Pagamento" name="methodPayment" rules={[{ required: true, message: "Por favor, selecione o método de pagamento" }]}>
          <Select placeholder="Selecione um método de pagamento">
            <Option value="Pix">Pix</Option>
            <Option value="Cartão">Cartão</Option>
            <Option value="Dinheiro">Dinheiro</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Salvar Venda
          </Button>
        </Form.Item>
      </Form>
    </PainelPage>
  );
};

export default VendasCreate;
