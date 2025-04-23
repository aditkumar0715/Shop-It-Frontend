import React, { useEffect } from "react";
import CartItem from "../components/cart/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, addItem } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Box, ShoppingCart } from "lucide-react";
import { Link } from "react-router";

function EmptyCart() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <motion.div
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        className="text-primary mb-4"
      >
        <Box className="ml-4 h-16 w-16" />
      </motion.div>
      <ShoppingCart className="text-muted-foreground h-24 w-24" />
      <p className="mt-4 text-lg font-bold">Your cart is empty!</p>
      <p className="text-muted-foreground mt-1 text-sm">
        Go ahead, add something to your cart. It’s lonely in here!
      </p>
      <Link
        to="/"
        className="text-primary mt-3 text-sm hover:underline sm:text-base"
      >
        Take me shopping!
      </Link>
    </div>
  );
}

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      savedCartItems.forEach((item) => {
        dispatch(addItem({ ...item, quantity: item.quantity }));
      });
    }
  }, [dispatch]);

  const handleRemove = (id, title) => {
    dispatch(removeItem(id));
    toast.info(`${title} removed from cart`, { toastId: id });
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const discountPercentage = Math.floor(Math.random() * 20) + 5; // Random discount percentage between 5% and 25%
  const discountAmount = (totalPrice * discountPercentage) / 100;
  const deliveryCharges = Math.floor(Math.random() * 10) + 5; // Random delivery charges between $5 and $15
  const finalAmount = totalPrice - discountAmount + deliveryCharges;

  return (
    <div className="cart-page bg-background text-foreground p-4">
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col-reverse gap-6 md:flex-row">
          <div className="cart-items flex-1">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={(id) => handleRemove(id, item.title)}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
          <div className="order-summary bg-card text-card-foreground w-full self-start rounded-lg p-4 shadow-md md:sticky md:top-4 md:w-1/3">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            <div className="mb-2 flex justify-between">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span>Discount ({discountPercentage}%):</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span>Delivery Charges:</span>
              <span>${deliveryCharges.toFixed(2)}</span>
            </div>
            <div className="mb-4 flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${finalAmount.toFixed(2)}</span>
            </div>
            <button className="place-order bg-primary text-primary-foreground hover:bg-primary/80 w-full rounded px-4 py-2 transition-colors active:scale-95">
              Place Order
            </button>
            <p className="mt-2 text-lg font-bold text-green-600">
              You save ${discountAmount.toFixed(2)} on this order
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
