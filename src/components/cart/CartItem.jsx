import React from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus } from "lucide-react";

function CartItem({ item, onRemove, onUpdateQuantity }) {
  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <motion.div
      className="cart-item flex flex-wrap justify-center sm:flex-row sm:items-center md:justify-between bg-card text-card-foreground shadow-md rounded-lg p-4 mb-4 gap-4 md:gap-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        loading="lazy"
        className="cart-item-image max-w-16 object-contain rounded-md"
      />
      <div className="cart-item-details flex-1 ml-4">
        <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
        <p className="text-muted-foreground mb-2">${item.price.toFixed(2)}</p>
        <div className="flex items-center space-x-1">
          <button
            onClick={handleDecrease}
            className="bg-muted text-muted-foreground py-1 px-3 hover:bg-muted/80 active:scale-95 flex items-center justify-center h-10 rounded-l-md"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={item.quantity}
            readOnly
            onChange={(e) =>
              onUpdateQuantity(item.id, parseInt(e.target.value, 10))
            }
            className="cart-item-quantity w-12 p-1 border border-muted text-center focus:outline-none h-10"
          />
          <button
            onClick={handleIncrease}
            className="bg-muted text-muted-foreground py-1 px-3 hover:bg-muted/80 active:scale-95 flex items-center justify-center h-10 rounded-r-md"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* <div className=""> */}
      <button
        onClick={() => onRemove(item.id, item.title)}
        className="flex-1 sm:flex-initial remove-item bg-destructive text-white py-2 px-4 rounded hover:bg-destructive/80 active:scale-95 transition-colors self-end sm:self-auto flex items-center justify-center gap-2"
      >
        <Trash2 className="w-5 h-5 mr-2" /> Remove
      </button>
      {/* </div> */}
    </motion.div>
  );
}

export default CartItem;
