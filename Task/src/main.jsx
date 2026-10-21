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
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/Style/style.css";
import App from "./App.jsx";
import { ThemeProvider } from "./assets/context/ThemeContext";
import { LanguageProvider } from "./assets/context/LanguageContext";
import AppProviders from "./assets/context/AppProviders.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        <ThemeProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ThemeProvider>
      </AppProviders>
    </BrowserRouter>
  </StrictMode>,
);
