import { useEffect, useState } from "react";
import {
  selectAllProducts,
  selectProductsLoading,
} from "../../store/productSlice";
import { useAppSelector } from "../../store/store";
import { IProduct } from "../../types/Product";
import Spinner from "../shared/Spinner";
import ProductItem from "./ProductItem";

const ProductsPage = () => {
  const products = useAppSelector(selectAllProducts);
  const productsLoading = useAppSelector(selectProductsLoading);
  const [selection, setSelection] = useState("bakery");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setFilteredProducts(products.filter((item) => item.category === selection));
  }, [selection, products]);

  return (
    <main className="mx-auto mt-32 max-w-7xl">
      <div className="flex items-center mb-10">
        <button
          onClick={() => setSelection("bakery")}
          className={`${
            selection === "bakery" && "underline"
          } ml-10 rounded-lg text-xl font-semibold text-gray-800 hover:underline`}
        >
          Bakery
        </button>
        <button
          onClick={() => setSelection("pastry")}
          className={`${
            selection === "pastry" && "underline"
          } ml-10 rounded-lg text-xl font-semibold text-gray-800 hover:underline`}
        >
          Pastry
        </button>
      </div>
      {productsLoading ? (
        <Spinner />
      ) : (
        <section className="flex flex-wrap">
          {filteredProducts.map((item) => (
            <ProductItem product={item} key={item.id} />
          ))}
        </section>
      )}
    </main>
  );
};

export default ProductsPage;
