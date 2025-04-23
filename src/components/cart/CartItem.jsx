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
      className="cart-item bg-card text-card-foreground mb-4 flex flex-wrap justify-center gap-4 rounded-lg p-4 shadow-md sm:flex-row sm:items-center md:justify-between md:gap-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <img
        src={item.thumbnail}
        alt={item.title}
        loading="lazy"
        className="cart-item-image max-w-16 rounded-md object-contain"
      />
      <div className="cart-item-details ml-4 flex-1">
        <h4 className="mb-1 text-lg font-semibold">{item.title}</h4>
        <p className="text-muted-foreground mb-2">${item.price.toFixed(2)}</p>
        <div className="flex items-center space-x-1">
          <button
            onClick={handleDecrease}
            className="bg-muted text-muted-foreground hover:bg-muted/80 flex h-10 items-center justify-center rounded-l-md px-3 py-1 active:scale-95"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            value={item.quantity}
            readOnly
            onChange={(e) =>
              onUpdateQuantity(item.id, parseInt(e.target.value, 10))
            }
            className="cart-item-quantity border-muted h-10 w-12 border p-1 text-center focus:outline-none"
          />
          <button
            onClick={handleIncrease}
            className="bg-muted text-muted-foreground hover:bg-muted/80 flex h-10 items-center justify-center rounded-r-md px-3 py-1 active:scale-95"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      {/* <div className=""> */}
      <button
        onClick={() => onRemove(item.id, item.title)}
        className="remove-item bg-destructive hover:bg-destructive/80 flex flex-1 items-center justify-center gap-2 self-end rounded px-4 py-2 text-white transition-colors active:scale-95 sm:flex-initial sm:self-auto"
      >
        <Trash2 className="mr-2 h-5 w-5" /> Remove
      </button>
      {/* </div> */}
    </motion.div>
  );
}

export default CartItem;
