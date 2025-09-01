import { Navigate } from "react-router-dom";
import { RoutesEnum } from "../enums/enums";
import type { RouteObject } from "react-router-dom";

import Login from "../pages/Login";
import Screen from "../components/Screen";
import VendasCreate from "../pages/Painel/Vendas/VendasCreate";
import ComprasCreate from "../pages/Painel/Compras/ComprasCreate";
import VendasDashboard from "../pages/Painel/Vendas/VendasDashboard";
import ProductsCreate from "../pages/Painel/Produtos/ProdutosCreate";
import ComprasDashboard from "../pages/Painel/Compras/ComprasDashboard";
import ProdutosDashboard from "../pages/Painel/Produtos/ProdutosDashboard";

export const screensRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Screen />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <Navigate to={RoutesEnum.Login} replace />,
      },
      {
        path: RoutesEnum.Login,
        element: <Login />,
      },
    ],
  },
];

export const loggedScreensRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Screen />,
    children: [
      {
        path: RoutesEnum.Dashboard,
        element: <div>Dashboard</div>,
      },
      {
        path: RoutesEnum.Produtos,
        element: <ProdutosDashboard />,
      },
      {
        path: RoutesEnum.Cadastrar_Produto,
        element: <ProductsCreate />,
      },
      {
        path: RoutesEnum.Editar_Produto,
        element: <div>Editar Produto</div>,
      },
      {
        path: RoutesEnum.Compras,
        element: <ComprasDashboard />,
      },
      {
        path: RoutesEnum.Cadastrar_Compra,
        element: <ComprasCreate />,
      },
      {
        path: RoutesEnum.Editar_Compra,
        element: <div>Editar Compra</div>,
      },
      {
        path: RoutesEnum.Vendas,
        element: <VendasDashboard />,
      },
      {
        path: RoutesEnum.Cadastrar_Venda,
        element: <VendasCreate />,
      },
      {
        path: RoutesEnum.Editar_Venda,
        element: <div>Editar Venda</div>,
      },
      {
        path: RoutesEnum.Relatorios,
        element: <div>Relatorios</div>,
      },
      {
        path: RoutesEnum.Register,
        element: <div>Register</div>,
      },
      {
        path: RoutesEnum.Configuracoes,
        element: <div>Configurações</div>,
      },
    ],
  },
];
