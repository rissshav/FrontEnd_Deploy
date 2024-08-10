import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
import './style/global.css'

import store from "./store";
import ContextProvider from "context/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider >
    <Provider store={store}>
      <React.Fragment>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.Fragment>
    </Provider>
    </ContextProvider>
);

serviceWorker.unregister()
