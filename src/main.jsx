import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import App from "./App.jsx";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function AppWrapper() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <>
      <App />
      <ToastContainer
        theme={theme}
        position="top-right"
        autoClose={3000}
        newestOnTop={false}
        draggable
        stacked
        limit={3}
      />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  </Provider>,
);
