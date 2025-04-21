import React from "react";
import { Outlet } from "react-router";
import Navbar from "../common/Navbar";
import CategoryList from "./CategoryList";
import Footer from "../common/Footer";


function Layout() {
  return (
    <div className="layout flex flex-col min-h-screen">
      <Navbar />
      <CategoryList />
      <main className="flex-grow max-w-[1500px] w-full mx-auto mt-1 p-2 md:p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
