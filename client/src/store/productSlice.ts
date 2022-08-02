import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct, IFetchProductsApiResponse } from "../types/Product";
import { RootState, store } from "./store";

// Define a type for the slice state
interface ProductsState {
  products: IProduct[];
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: ProductsState = {
  products: [],
  isLoading: false,
};

const productsSlice = createSlice({
  name: "Products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLoading: (state) => {
      state.isLoading = true;
    },
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.isLoading = false;
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const res = (await (
        await axios.get("/api/products")
      ).data) as IFetchProductsApiResponse;
      store.dispatch(setProducts(res.products));
    } catch (err) {
      console.log(err);
    }
  }
);

export default productsSlice.reducer;

export const selectProductsLoading = (state: RootState) =>
  state.products.isLoading;
export const selectAllProducts = (state: RootState) => state.products.products;

export const selectProductById = (state: RootState, productId: number) =>
  state.products.products.find((product) => product.id === productId);
