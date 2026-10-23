import { createContext, useContext, useState } from "react";
import { Button, Card, Navbar, Container } from "react-bootstrap";

// 1. Context உருவாக்கு
const ThemeContext = createContext();

// 2. Provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consumer components
function Header() {
  const { theme } = useContext(ThemeContext);
  return (
    <Navbar bg={theme} data-bs-theme={theme}>
      <Container>
        <h6 className="text-danger">useContext</h6>
        <Navbar.Brand>My App ({theme} mode)</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

function Content() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Card
      className="p-4 m-3"
      bg={theme}
      text={theme === "dark" ? "white" : "dark"}
    >
      <p>Current Theme: {theme}</p>
      <Button variant="primary" onClick={toggleTheme}>
        Toggle Theme
      </Button>
    </Card>
  );
}

function Seven() {
  return (
    <>
      <ThemeProvider>
        <Header />
        <Content />
      </ThemeProvider>
      <Card className="p-2 mt-2">
        <h6 className="text-danger">useContext</h6>
        <p>
          <span className="text-danger">Concept: </span>Props-ஐ ஒவ்வொரு level-ஆ
          கடத்தாம (prop drilling), எந்த component-லிருந்தும் நேரடியா data
          எடுக்க.
        </p>
        <p>
          <span className="text-danger">Analogy: </span> வீட்டு Wi-Fi: ஒவ்வொரு
          அறைக்கும் wire இழுக்காம, எல்லா அறையிலும் connect பண்ணலாம்.
        </p>
        <h6 className="text-danger">Step by Step:</h6>
        <ol>
          <li>createContext() → ஒரு “Wi-Fi router” உருவாக்குறோம்.</li>
          <li>
            ThemeProvider → data (theme, toggleTheme) இங்கே value-ல்
            கொடுக்கிறோம்.
          </li>
          <li>
            Provider-க்குள் இருக்கும் எல்லா component-உம் அந்த data-வை
            எடுக்கலாம்.
          </li>
          <li>
            useContext(ThemeContext) → எந்த component-லிருந்தும் நேரடியா data
            எடுக்கிறோம், props எதுவும் தேவையில்ல.
          </li>
          <li>
            Content-ல் button click ஆனா Header-உம் மாறும்; இரண்டும் ஒரே context
            பகிர்ந்துக்கிறதால்.
          </li>
        </ol>
      </Card>
    </>
  );
}

export default Seven;
