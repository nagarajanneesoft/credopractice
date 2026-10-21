import Button from "react-bootstrap/Button";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme(); // props இல்ல!

  return (
    <span size="sm" onClick={toggleTheme} className="dark_light_mode">
      {theme === "light" ? "🌙" : "☀️"}
    </span>
  );
}

export default ThemeToggle;
