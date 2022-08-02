//Core
import { Route, Routes } from "react-router-dom";
//Store
import Login from "./components/auth/Login";
import { useEffect } from "react";
import { fetchProducts } from "./store/productSlice";
import { useAppDispatch } from "./store/store";
//Components
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./components/home/Home";
import ProductsPage from "./components/products/ProductsPage";
import ProductDetails from "./components/products/ProductDetails";
import About from "./components/about/About";
import Cart from "./components/cart/Cart";
import Signup from "./components/auth/Signup";
import PrivateRoute from "./components/shared/PrivateRoute";
import Order from "./components/order/Order";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/orderCompleted" element={<Order />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
