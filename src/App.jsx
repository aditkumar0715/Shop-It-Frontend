import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsPage from "./pages/SearchResultsPage"; // Now uses ProductsList

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="search" element={<ProductsPage />} />
          <Route path="category/:category" element={<ProductsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
