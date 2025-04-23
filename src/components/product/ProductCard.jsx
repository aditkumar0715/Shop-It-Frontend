import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
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
    <div className="product-card-container bg-card text-card-foreground flex flex-wrap gap-4 rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg">
      <motion.img
        src={product.thumbnail}
        alt={product.title}
        className="h-56 w-full cursor-pointer rounded-md object-contain md:w-1/3"
        loading="lazy"
        onClick={handleCardClick}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="flex flex-1 flex-col gap-4">
        <div onClick={handleCardClick} className="cursor-pointer">
          <h3 className="mb-2 text-lg font-semibold">{product.title}</h3>
          <p className="text-muted-foreground mb-2 hidden text-sm sm:block">
            {product.description}
          </p>

          <div className="flex items-center gap-2">
            <RatingBadge rating={product.rating} />
            <span className="text-muted-foreground text-sm">
              based on {product.reviews.length} Reviews
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 md:flex-col md:items-start">
          <div>
            <p className="text-primary mb-1 text-xl font-bold">
              ${product.price.toFixed(2)}
            </p>
            {product.discountPercentage && (
              <div className="flex items-center space-x-2">
                <p className="text-muted-foreground text-sm line-through">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </p>
                <p className="text-success text-sm font-semibold">
                  {product.discountPercentage}% off
                </p>
              </div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="add-to-cart bg-primary text-primary-foreground hover:bg-primary/80 group flex flex-1 items-center justify-center gap-2 rounded px-4 py-2 text-nowrap transition-colors active:scale-95 md:w-auto md:flex-initial md:self-end"
          >
            <div className="cart-icon transition-transform duration-75 ease-in-out group-hover:translate-x-[-5px] group-hover:translate-y-[-3px]">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
