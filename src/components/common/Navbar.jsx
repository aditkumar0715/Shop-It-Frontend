import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon, ShoppingCart, User, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "../search/SearchBar";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import { toggleTheme } from "../../redux/themeSlice";

function Navbar({ onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => setIsMenuOpen(false));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="navbar bg-background text-foreground shadow-md p-4 flex items-center justify-between">
      <Link
        to="/"
        className="logo hidden md:block text-xl font-bold text-primary"
      >
        Shop-It
      </Link>
      <Link
        to="/"
        className="logo block md:hidden text-xl font-bold text-primary"
      >
        SI
      </Link>
      <div className="search-bar-container flex-1 mx-4 min-w-20">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/cart")}
          className="cart flex items-center relative"
        >
          <ShoppingCart className="w-6 h-6" />{" "}
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
        <button
          onClick={toggleMenu}
          className="hamburger-menu flex items-center bg-muted text-muted-foreground px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground transition-colors md:hidden"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute z-10 top-16 right-0 bg-card text-card-foreground shadow-md rounded p-4 w-48 md:hidden flex flex-col gap-4"
          >
            <button
              onClick={() => navigate("/login")}
              className="w-full text-left py-2 px-4 rounded hover:bg-muted hover:text-muted-foreground transition-colors flex items-center gap-2"
            >
              <User className="w-6 h-6" /> Login
            </button>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="w-full text-center py-2 px-4 rounded hover:bg-muted hover:text-muted-foreground transition-colors flex items-center justify-center gap-2"
            >
              {theme === "light" ? (
                <Moon className="w-8 h-8" />
              ) : (
                <Sun className="w-8 h-8" />
              )}
              <span className="text-sm">Switch Theme</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="actions hidden md:flex items-center space-x-4">
        <button className="login flex items-center bg-muted text-muted-foreground py-2 px-4 rounded hover:bg-accent hover:text-accent-foreground transition-colors">
          <User className="w-5 h-5 mr-2" /> Login
        </button>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="theme-toggle flex items-center bg-muted text-muted-foreground py-2 px-4 rounded hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
