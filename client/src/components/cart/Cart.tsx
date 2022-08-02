import { useAppSelector, useAppDispatch } from "../../store/store";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { confirmOrder } from "../../store/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (total, item) => item.product.price * item.quantity + total,
    0
  );

  const confirmPurchase = () => {
    dispatch(confirmOrder());
    navigate("/orderCompleted");
  };

  return (
    <main className="mx-auto mt-36 min-h-[72vh] w-5/6 max-w-7xl sm:flex sm:justify-around sm:p-5">
      <section>
        <h2 className="mb-10 text-3xl font-semibold text-mainOrange">
          Your cart
        </h2>
        {cartItems.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </section>
      <section>
        <h2 className="mb-10 text-3xl font-semibold text-mainOrange">
          Procede to checkout
        </h2>
        <p className="text-lg text-gray-800">
          Total: <strong>${total.toFixed(2)}</strong>
        </p>
        {user.isAuthenticated ? (
          <button
            onClick={confirmPurchase}
            className="w-full p-2 mt-5 text-white rounded-lg bg-mainOrange"
          >
            Confirm Purchase
          </button>
        ) : (
          <p className="w-full p-2 mt-5 text-2xl text-mainOrange">
            Please login to order
          </p>
        )}
      </section>
    </main>
  );
};

export default Cart;
