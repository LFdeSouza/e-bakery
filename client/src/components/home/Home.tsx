import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import img from "../../assets/images/mixed_breads.jpg";
import SuggestionBox from "./SuggestionBox";
import Spinner from "../shared/Spinner";
import {
  selectAllProducts,
  selectProductsLoading,
} from "../../store/productSlice";

const Home = () => {
  const navigate = useNavigate();
  const productsLoading = useAppSelector(selectProductsLoading);
  const products = useAppSelector(selectAllProducts);
  const [suggested, setSuggested] = useState<number[]>([]);

  useEffect(() => {
    setSuggested(generateRandomArr());
  }, []);

  const generateRandomArr = (): number[] => {
    const arr: number[] = [];
    while (arr.length < 4) {
      const ranNum = Math.floor(Math.random() * 16);
      if (!arr.includes(ranNum)) {
        arr.push(ranNum);
      }
    }
    return arr;
  };

  return (
    <main className="mx-auto mt-14 font-roboto sm:mt-24 sm:max-w-7xl">
      <section className="mt-10 sm:overflow-hidden sm:rounded">
        <div className="relative">
          <img
            src={img}
            alt="mixed breads"
            className="h-[40rem] w-full object-cover"
          />
          <div className="absolute top-10 left-1/2 flex h-3/5 w-4/6 -translate-x-1/2 flex-col gap-6 rounded-2xl bg-paleOrange/80 p-10 sm:top-20 sm:left-52 sm:h-[65%] sm:w-80">
            <h1 className="text-4xl font-semibold leading-10 text-gray-900 sm:text-4xl">
              From the oven to your door!
            </h1>
            <p className="text-gray-900">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              cupiditate molestias blanditiis.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="p-2 px-4 mt-2 text-2xl text-white rounded-lg bg-mainOrange hover:bg-orange-600 sm:mt-10"
            >
              Order now!
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center w-full p-10 mx-auto mt-10">
        <h2 className="mb-4 text-4xl text-center text-gray-900 sm:text-5xl">
          Suggestions for the day
        </h2>
        <div className="flex-wrap items-center justify-center sm:flex lg:flex-nowrap">
          {productsLoading ? (
            <Spinner />
          ) : (
            suggested.map(
              (item) =>
                products[item] && (
                  <SuggestionBox
                    product={products[item]}
                    key={products[item].id}
                  />
                )
            )
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
