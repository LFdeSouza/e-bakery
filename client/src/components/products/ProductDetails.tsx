import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/store";
import useImage from "../../hooks/useImage";
import {
  placeOrder,
  selectOrderByProductId,
  updateOrder,
} from "../../store/cartSlice";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { selectUser } from "../../store/authSlice";
import { selectProductById } from "../../store/productSlice";

const ProductDetails = () => {
  const dispatch = useAppDispatch();

  const params = useParams<{ productId: string }>();
  const productId = Number(params.productId);
  const userId = useAppSelector(selectUser)?.id;
  const order = useAppSelector((state) =>
    selectOrderByProductId(state, productId)
  );
  const product = useAppSelector((state) =>
    selectProductById(state, productId)
  );
  const image = useImage(product?.id);

  return !product ? (
    <div className="mx-auto mt-32 mb-[40rem] max-w-7xl text-3xl font-semibold text-gray-800">
      We could not find your request
    </div>
  ) : (
    <main className="mx-auto mt-32 mb-80 max-w-7xl">
      <div className="sm:mx-auto sm:flex sm:w-11/12 sm:justify-between sm:gap-4">
        <div className="mx-auto w-11/12 sm:max-w-[35rem] sm:p-5">
          <img
            className="object-cover w-full h-full rounded-lg"
            src={image.image}
            alt={product.name}
          />
        </div>
        <div className="flex flex-col w-11/12 mx-auto mt-10 sm:max-w-md">
          <h2 className="text-lg font-semibold text-mainOrange">
            {product.category}
          </h2>
          <h3 className="mt-2 text-4xl font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="mt-4 text-gray-500">{product.description}</p>
          <p className="mt-3 text-2xl font-semibold text-gray-800">
            {`$${product.price.toString()}`}
          </p>
          <div className="items-center sm:flex sm:justify-between sm:gap-3">
            <div className="flex items-center justify-between p-4 px-10 mt-3 rounded-lg bg-grayishBlue sm:w-2/5 sm:px-5">
              <button
                onClick={() => {
                  order &&
                    dispatch(
                      updateOrder({
                        orderId: order.id,
                        operation: "decrement",
                        userId,
                      })
                    );
                }}
              >
                <MinusIcon className="w-6 h-6 text-mainOrange" />
              </button>
              <p className="text-lg font-bold text-gray-800">
                {order?.quantity.toString() || "0"}
              </p>
              <button
                onClick={() =>
                  order
                    ? dispatch(
                        updateOrder({
                          orderId: order.id,
                          operation: "increment",
                          userId,
                        })
                      )
                    : dispatch(placeOrder({ productId: product.id, userId }))
                }
              >
                <PlusIcon className="w-6 h-6 text-mainOrange" />
              </button>
            </div>
            <button
              onClick={() => {
                dispatch(placeOrder({ userId, productId }));
              }}
              className="w-full p-4 mt-4 text-white rounded-lg bg-mainOrange hover:bg-orange-600 sm:w-3/5"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
