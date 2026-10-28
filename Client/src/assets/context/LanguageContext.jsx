import { createContext, useContext, useState } from "react";

// எல்லா text-ம் இங்க தான்
const translations = {
  en: {
    home: "Home",
    about: "About",
    welcome: "Welcome to our website",
    price: "Price",
    buy: "Buy Now",
    footer: "All rights reserved",
    switchBtn: "Español",
  },
  es: {
    home: "Inicio",
    about: "Acerca de",
    welcome: "Bienvenido a nuestro sitio web",
    price: "Precio",
    buy: "Comprar ahora",
    footer: "Todos los derechos reservados",
    switchBtn: "English",
  },
};

// 1) பலகை
const LanguageContext = createContext();

// 2) Provider
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  const toggleLang = () => setLang(lang === "en" ? "es" : "en");

  // t("home") -> Home அல்லது Inicio
  const t = (key) => translations[lang][key];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3) படிக்க
export const useLanguage = () => useContext(LanguageContext);
