import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import RatingBadge from "./RatingBadge";


function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity: 1 }));
    toast.success(`${product.title} added to cart`, {
      toastId: product.id,
    });
  };

  return (
    <div className="product-card-container bg-card text-card-foreground shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-wrap gap-4">
      <motion.img
        src={product.thumbnail}
        alt={product.title}
        className="w-full md:w-1/3 h-56 object-contain rounded-md cursor-pointer"
        loading="lazy"
        onClick={handleCardClick}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="flex flex-col flex-1 gap-4">
        <div onClick={handleCardClick} className="cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
          <p className="text-sm text-muted-foreground mb-2 hidden sm:block">
            {product.description}
          </p>

          <div className="flex items-center gap-2">
            <RatingBadge rating={product.rating} />
            <span className="text-sm text-muted-foreground">
              based on {product.reviews.length} Reviews
            </span>
          </div>

        </div>
        <div className="flex flex-wrap md:flex-col md:items-start items-center justify-between gap-4">
          <div>
            <p className="text-xl font-bold text-primary mb-1">
              ₹{product.price.toFixed(2)}
            </p>
            {product.discountPercentage && (
              <div className="flex items-center space-x-2">
                <p className="text-sm text-muted-foreground line-through">
                  ₹
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </p>
                <p className="text-sm text-success font-semibold">
                  {product.discountPercentage}% off
                </p>
              </div>
            )}
          </div>
          <motion.button
            onClick={handleAddToCart}
            className="add-to-cart flex-1 md:flex-initial bg-primary text-primary-foreground py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-primary/80 active:scale-95 transition-colors md:w-auto md:self-end group text-nowrap"
          >
            <motion.div
              className="cart-icon group-hover:translate-x-[-3px] group-hover:translate-y-[-3px]"
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.div>
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
