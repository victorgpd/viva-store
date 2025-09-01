export interface IUser {
  uid: string;
  name: string;
  email: string;
}

export interface ILoginPayload {
  email: string;
  senha: string;
}

export interface IProduct {
  id: number;
  name: string;
  stock?: number;
  currentStock?: number;
  priceBuy?: number;
  priceSale?: number;
}

export interface IVenda {
  id?: number;
  productId: number;
  productName: string;
  quantity: number;
  data: string;
  priceSale: number;
  methodPayment: "Pix" | "Cartão" | "Dinheiro";
}

export interface ICompra {
  id?: number;
  productId: number;
  productName: string;
  quantity: number;
  data: string;
  priceBuy: number;
  buyer: string;
}
