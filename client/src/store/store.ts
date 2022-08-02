import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: { auth: authSlice, products: productSlice, cart: cartSlice },
});

//Infer the "RootState" and "AppDispatch" types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks: Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
