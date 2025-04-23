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
    <div className="navbar bg-background text-foreground flex items-center justify-between p-4 shadow-md">
      <Link
        to="/"
        className="logo text-primary hidden text-xl font-bold md:block"
      >
        Shop-It
      </Link>
      <Link
        to="/"
        className="logo text-primary block text-xl font-bold md:hidden"
      >
        SI
      </Link>
      <div className="search-bar-container mx-4 min-w-20 flex-1">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/cart")}
          className="cart relative flex items-center"
        >
          <ShoppingCart className="h-6 w-6" />{" "}
          {cartItems.length > 0 && (
            <span className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
              {cartItems.length}
            </span>
          )}
        </button>
        <button
          onClick={toggleMenu}
          className="hamburger-menu bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center rounded px-2 py-1 transition-colors md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
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
            className="bg-card text-card-foreground absolute top-16 right-0 z-10 flex w-48 flex-col gap-4 rounded p-4 shadow-md md:hidden"
          >
            <button
              onClick={() => navigate("/login")}
              className="hover:bg-muted hover:text-muted-foreground flex w-full items-center gap-2 rounded px-4 py-2 text-left transition-colors"
            >
              <User className="h-6 w-6" /> Login
            </button>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="hover:bg-muted hover:text-muted-foreground flex w-full items-center justify-center gap-2 rounded px-4 py-2 text-center transition-colors"
            >
              {theme === "light" ? (
                <Moon className="h-8 w-8" />
              ) : (
                <Sun className="h-8 w-8" />
              )}
              <span className="text-sm">Switch Theme</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="actions hidden items-center space-x-4 md:flex">
        <button className="login bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center rounded px-4 py-2 transition-colors">
          <User className="mr-2 h-5 w-5" /> Login
        </button>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="theme-toggle bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center rounded px-4 py-2 transition-colors"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
