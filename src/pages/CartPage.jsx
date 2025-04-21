import React, { useEffect } from "react";
import CartItem from "../components/cart/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, addItem } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Box, ShoppingCart } from "lucide-react";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
      <motion.div
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        className="text-primary mb-4"
      >
        <Box className="w-16 h-16 ml-4" />
      </motion.div>
      <ShoppingCart className="w-24 h-24 text-muted-foreground" />
      <p className="text-lg font-bold mt-4">Your cart is empty!</p>
      <p className="text-sm text-muted-foreground mt-2">
        Go ahead, add something to your cart. It’s lonely in here!
      </p>
    </div>
  );
}

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
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
        <div className="flex flex-col-reverse md:flex-row gap-6">
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
          <div className="order-summary w-full bg-card text-card-foreground shadow-md rounded-lg p-4 md:w-1/3 md:sticky md:top-4 self-start">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
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
            <div className="mb-4 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${finalAmount.toFixed(2)}</span>
            </div>
            <button className="place-order bg-primary text-primary-foreground py-2 px-4 rounded w-full hover:bg-primary/80 active:scale-95 transition-colors">
              Place Order
            </button>
            <p className="text-green-600 text-lg font-bold mt-2">
              You save ${discountAmount.toFixed(2)} on this order
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
