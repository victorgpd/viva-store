import Logotipo from "../../assets/logo-background.png";

import { AuthGate } from "./AuthGate";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { RoutesEnum } from "../../enums/enums";
import { Button, Menu, type MenuProps } from "antd";
import { setMenuSelected } from "../../redux/globalReducer/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Backdrop, ContainerScreen, Header, LogoContainer, Main, Sidebar, SidebarLogo } from "./styles";
import {
  BarChartOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  PlusOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const Screen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { logout } = useAuth(navigate);
  const { user, menuSelected } = useAppSelector((state) => state.globalReducer);

  const [width, setWidth] = useState(window.innerWidth);
  const [openIsMenu, setOpenIsMenu] = useState("-240px");

  const items: MenuItem[] = [
    { key: "dashboard", label: "Dashboard", icon: <HomeOutlined />, onClick: () => navigate(RoutesEnum.Dashboard) },
    {
      key: "produtosGroup",
      label: "Produtos",
      type: "group",
      children: [
        { key: "1", label: "Lista de produtos", icon: <UnorderedListOutlined />, onClick: () => navigate(RoutesEnum.Produtos) },
        { key: "2", label: "Cadastrar produto", icon: <PlusOutlined />, onClick: () => navigate(RoutesEnum.Cadastrar_Produto) },
      ],
    },
    {
      key: "comprasGroup",
      label: "Compras",
      type: "group",
      children: [
        { key: "3", label: "Lista de compras", icon: <ShoppingCartOutlined />, onClick: () => navigate(RoutesEnum.Compras) },
        { key: "4", label: "Cadastrar compra", icon: <PlusOutlined />, onClick: () => navigate(RoutesEnum.Cadastrar_Compra) },
      ],
    },
    {
      key: "vendasGroup",
      label: "Vendas",
      type: "group",
      children: [
        { key: "5", label: "Lista de vendas", icon: <ShoppingOutlined />, onClick: () => navigate(RoutesEnum.Vendas) },
        { key: "6", label: "Cadastrar venda", icon: <PlusOutlined />, onClick: () => navigate(RoutesEnum.Cadastrar_Venda) },
      ],
    },
    {
      key: "relatoriosGroup",
      label: "Relatórios",
      type: "group",
      children: [{ key: "7", label: "Relatórios", icon: <BarChartOutlined />, onClick: () => navigate(RoutesEnum.Relatorios) }],
    },
    { type: "divider" },
    {
      key: "configuracoesGroup",
      label: "Configurações",
      type: "group",
      children: [
        { key: "8", label: "Cadastrar usuário", icon: <UserAddOutlined />, onClick: () => navigate(RoutesEnum.Register) },
        { key: "9", label: "Configurações", icon: <SettingOutlined />, onClick: () => navigate(RoutesEnum.Configuracoes) },
        { key: "10", label: "Sair", icon: <LogoutOutlined />, style: { color: "red" }, onClick: logout },
      ],
    },
  ];

  const routeToKey: Record<string, string> = {
    [RoutesEnum.Dashboard]: "dashboard",
    [RoutesEnum.Produtos]: "1",
    [RoutesEnum.Cadastrar_Produto]: "2",
    [RoutesEnum.Compras]: "3",
    [RoutesEnum.Cadastrar_Compra]: "4",
    [RoutesEnum.Vendas]: "5",
    [RoutesEnum.Cadastrar_Venda]: "6",
    [RoutesEnum.Relatorios]: "7",
    [RoutesEnum.Register]: "8",
    [RoutesEnum.Configuracoes]: "9",
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    if (width <= 768) setOpenIsMenu("-240px");
    else setOpenIsMenu("0px");

    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    const key = routeToKey[location.pathname];
    if (key) dispatch(setMenuSelected([key]));
  }, [location]);

  const onClick: MenuProps["onClick"] = (e) => {
    dispatch(setMenuSelected(e.keyPath));
    if (width < 768) {
      handleMenuIsOpen();
    }
  };

  const handleMenuIsOpen = () => {
    setOpenIsMenu((prev) => (prev === "-240px" ? "0px" : "-240px"));
  };

  return (
    <ContainerScreen>
      {location.pathname.includes("painel") && (
        <>
          <Sidebar $openIsMenu={openIsMenu}>
            <SidebarLogo onClick={() => navigate(RoutesEnum.Login)}>
              <img src={Logotipo} alt="Logo da aplicação" />
              <h1>Viva Store</h1>
            </SidebarLogo>
            <Menu mode="inline" selectedKeys={menuSelected} onClick={onClick} items={items} />
          </Sidebar>
          <Backdrop $isVisible={openIsMenu === "0px" && width <= 768} onClick={handleMenuIsOpen} />
        </>
      )}

      <Header $hasSidebar={location.pathname.includes("painel")}>
        {width <= 768 && location.pathname.includes("painel") && <Button type="text" icon={<MenuOutlined />} onClick={handleMenuIsOpen} />}

        <>
          <LogoContainer onClick={() => navigate(RoutesEnum.Login)}>
            <img src={Logotipo} alt="Logo da aplicação" style={{ height: "100%" }} />
            <h1>Viva Store</h1>
          </LogoContainer>
        </>

        <h3>{user?.name && `Olá, ${user?.name}!`}</h3>

        <Button type="text" variant="text" color="danger" icon={<LogoutOutlined />} onClick={logout}>
          Sair
        </Button>
      </Header>

      <Main $hasSidebar={location.pathname.includes("painel")}>
        <AuthGate>
          <Outlet />
        </AuthGate>
      </Main>
    </ContainerScreen>
  );
};

export default Screen;
