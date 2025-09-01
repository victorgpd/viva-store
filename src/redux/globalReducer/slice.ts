import type { ICompra, IProduct, IUser, IVenda } from "../../enums/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  user: IUser;
  menuSelected: string[];

  products: IProduct[];
  compras: ICompra[];
  vendas: IVenda[];
}

const initialState: initialStateType = {
  user: { email: null, uid: null, name: null },
  menuSelected: [""],

  products: [],
  compras: [],
  vendas: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = { email: null, uid: null, name: null };
    },
    setMenuSelected: (state, action: PayloadAction<string[]>) => {
      state.menuSelected = action.payload;
    },
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setCompras: (state, action: PayloadAction<ICompra[]>) => {
      state.compras = action.payload;
    },
    setVendas: (state, action: PayloadAction<IVenda[]>) => {
      state.vendas = action.payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { setUser, clearUser, setMenuSelected, setProducts, setCompras, setVendas } = globalSlice.actions;
