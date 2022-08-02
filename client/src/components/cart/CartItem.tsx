import React from "react";
import { updateOrder, removeOrder } from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import useImage from "../../hooks/useImage";
import { ICartItem } from "../../types/Product";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { selectUser } from "../../store/authSlice";

interface Props {
  item: ICartItem;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUser)?.id;
  const image = useImage(item.product.id).image;
  const calculatedPrice = item.product.price * item.quantity;

  return (
    <div className="gap-12 mb-12 sm:flex">
      <div className="sm:w-48">
        <img className="object-cover w-full rounded-lg" src={image} alt="" />
      </div>
      <div className="flex flex-col mt-4 sm:mt-0 sm:w-64">
        <h2 className="text-2xl font-semibold text-gray-700">
          {item.product.name}
        </h2>
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-semibold text-gray-900">
            ${calculatedPrice}
          </p>
          <div className="flex items-center justify-between w-2/3 p-4 px-10 mt-3 rounded-lg bg-grayishBlue sm:px-5">
            <button
              onClick={() =>
                dispatch(
                  updateOrder({
                    orderId: item.id,
                    operation: "decrement",
                    userId,
                  })
                )
              }
            >
              <MinusIcon className="w-6 h-6 text-mainOrange" />
            </button>
            <p className="text-lg font-bold text-gray-800">{item.quantity}</p>
            <button
              onClick={() =>
                dispatch(
                  updateOrder({
                    orderId: item.id,
                    operation: "increment",
                    userId,
                  })
                )
              }
            >
              <PlusIcon className="w-6 h-6 text-mainOrange" />
            </button>
          </div>
        </div>

        <button
          onClick={() => dispatch(removeOrder({ orderId: item.id, userId }))}
          className="w-full px-4 py-3 text-white rounded-lg bg-mainOrange hover:bg-orange-600"
        >
          Remove from cart
        </button>
      </div>
    </div>
  );
};

export default CartItem;
