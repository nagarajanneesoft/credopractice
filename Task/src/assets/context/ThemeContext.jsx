import { createContext, useContext, useEffect, useState } from "react";

// 1) பலகையை உருவாக்கு
const ThemeContext = createContext();

// 2) Provider: data-வை வச்சிருக்கிற component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  // theme மாறும்போது <html data-bs-theme="dark"> நு set ஆகும்
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3) எந்த component-லயும் படிக்க சின்ன hook
export const useTheme = () => useContext(ThemeContext);
