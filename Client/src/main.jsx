// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../src/assets/Style/style.css";
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// );

import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/Style/style.css";
import App from "./App.jsx";
import { ThemeProvider } from "./assets/context/ThemeContext";
import { LanguageProvider } from "./assets/context/LanguageContext";
import AppProviders from "./assets/context/AppProviders.jsx";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../src/assets/Redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppProviders>
          <ThemeProvider>
            <LanguageProvider>
              <App />
            </LanguageProvider>
          </ThemeProvider>
        </AppProviders>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
