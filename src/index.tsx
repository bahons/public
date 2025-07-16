import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import { MathJaxContext } from "better-react-mathjax";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootEl && rootEl);
root.render(
   <Provider store={store}>
      {/* <React.StrictMode> */}
      <MathJaxContext>
         <App />
      </MathJaxContext>
      {/* </React.StrictMode> */}
   </Provider>
);
