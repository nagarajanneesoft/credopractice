import { Button, Card, Container } from "react-bootstrap";
import { LanguageProvider, useLanguage } from "../../context/LanguageContext";

// Component 1: Navbar
function DemoNavbar() {
  const { t, toggleLang } = useLanguage();
  return (
    <div className="d-flex gap-3 align-items-center border rounded p-2 mb-3">
      <b>{t("home")}</b>
      <span>{t("about")}</span>
      <Button size="sm" className="ms-auto" onClick={toggleLang}>
        {t("switchBtn")}
      </Button>
    </div>
  );
}

// Component 2: Welcome
function Welcome() {
  const { t } = useLanguage();
  return <h4>{t("welcome")}</h4>;
}

// Component 3: Product card (static)
function ProductCard() {
  const { t } = useLanguage();
  return (
    <Card className="p-3 my-3" style={{ maxWidth: 300 }}>
      <h6>Laptop</h6>
      <p className="mb-2">{t("price")}: ₹55000</p>
      <Button variant="success">{t("buy")}</Button>
    </Card>
  );
}

// Component 4: Footer
function DemoFooter() {
  const { t } = useLanguage();
  return <small className="text-muted">{t("footer")}</small>;
}

// Page
export default function LanguageDemo() {
  return (
    <LanguageProvider>
      <Container className="py-4">
        <DemoNavbar />
        <Welcome />
        <ProductCard />
        <DemoFooter />
      </Container>
    </LanguageProvider>
  );
}
