import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//Router
import { BrowserRouter } from "react-router-dom";
//redux
import { Provider } from "react-redux";
import { store } from "./store/store";
import { loadUser } from "./store/authSlice";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
//Fetch user on load
store.dispatch(loadUser());
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
