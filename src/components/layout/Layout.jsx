import React from "react";
import { Outlet } from "react-router";
import Navbar from "../common/Navbar";
import CategoryList from "./CategoryList";
import Footer from "../common/Footer";

function Layout() {
  return (
    <div className="layout flex min-h-screen flex-col">
      <Navbar />
      <CategoryList />
      <main className="mx-auto mt-1 w-full max-w-[1500px] flex-grow p-2 md:p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
