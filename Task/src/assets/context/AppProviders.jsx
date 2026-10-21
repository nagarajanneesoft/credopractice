import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import { DataProvider } from "./DataContext";

// Order முக்கியம்: DataProvider, AuthProvider-க்கு கீழ இருக்கணும்
const providers = [ThemeProvider, AuthProvider, DataProvider];

export default function AppProviders({ children }) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children,
  );
}
