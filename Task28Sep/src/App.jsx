import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./assets/component/Pages/Home";
// import AboutPage from "./assets/component/Pages/About";
import { Col, Container, NavDropdown, Row } from "react-bootstrap";
import Header from "./assets/component/Header";
import Footer from "./assets/component/Footer";
// Task 28 Sep
import ColorButtons from "./assets/component/Pages/Task28Sep/ColorButtons";
import ControlledInput from "./assets/component/Pages/Task28Sep/ControlledInput";
import AsyncCounter from "./assets/component/Pages/Task28Sep/AsyncCounter";
import CompareForm from "./assets/component/Pages/Task28Sep/CompareForm";
import FastClicker from "./assets/component/Pages/Task28Sep/FastClicker";
import LoginManual from "./assets/component/Pages/Task28Sep/LoginManual";
import LoginFormik from "./assets/component/Pages/Task28Sep/LoginFormik";
import RegistrationFormik from "./assets/component/Pages/Task28Sep/RegistrationFormik";
import SimpleCounter from "./assets/component/Pages/Task28Sep/SimpleCounter";
import FormikValidation from "./assets/component/Pages/Task28Sep/FormikValidation";
import YupForm from "./assets/component/Pages/Task28Sep/YupForm";
import DynamicInputHandling from "./assets/component/Pages/Task28Sep/DynamicInputHandling";
import RegisterForm from "./assets/component/Pages/Task28Sep/RegisterForm";
// Task 03 Oct
import StateChangeObserver from "./assets/component/Pages/Task03Oct/StateChangeObserver";
import MigratingLifecycleMethods from "./assets/component/Pages/Task03Oct/MigratingLifecycleMethods";
import DynamicTitleUpdater from "./assets/component/Pages/Task03Oct/DynamicTitleUpdater";
import CleanupLogicSimulation from "./assets/component/Pages/Task03Oct/CleanupLogicSimulation";
import LifecyclePerformanceAudit from "./assets/component/Pages/Task03Oct/LifecyclePerformanceAudit";
import SettingUpNavigationFoundation from "./assets/component/Pages/Task03Oct/SettingUpNavigationFoundation";
import StructuringRoutes from "./assets/component/Pages/Task03Oct/StructuringRoutes";
import ImplementingNavigationElements from "./assets/component/Pages/Task03Oct/ImplementingNavigationElements";
import DynamicRoutingUserProfile from "./assets/component/Pages/Task03Oct/User/DynamicRoutingUserProfile";
import NotFound from "./assets/component/Pages/Task03Oct/NotFound";
import Contact from "./assets/component/Pages/Contact/Contact";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex-shrink-0">
        <Container>
          <Row></Row>
          <Row>
            <Col>
              <Routes>
                {/* 
                <Route path="/about" element={<AboutPage />} /> */}
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFound />} />

                <Route path="/home" element={<HomePage />} />
                <Route path={"/contact"} element={<Contact />} />
                <Route
                  path={"/user/:name"}
                  element={<DynamicRoutingUserProfile />}
                />
                {/* Task 28 Sep */}
                <Route path={"/ColorButtons"} element={<ColorButtons />} />
                <Route
                  path={"/ControlledInput"}
                  element={<ControlledInput />}
                />
                <Route path={"/AsyncCounter"} element={<AsyncCounter />} />
                <Route path={"/SimpleCounter"} element={<SimpleCounter />} />
                <Route path={"/CompareForm"} element={<CompareForm />} />
                <Route path={"/FastClicker"} element={<FastClicker />} />
                <Route path={"/LoginManual"} element={<LoginManual />} />
                <Route path={"/LoginFormik"} element={<LoginFormik />} />
                <Route
                  path={"/RegistrationFormik"}
                  element={<RegistrationFormik />}
                />
                <Route
                  path="/formikvalidation"
                  element={<FormikValidation />}
                />
                <Route
                  path={"/dynamicinputhandling"}
                  element={<DynamicInputHandling />}
                />
                <Route
                  path={"/productionrefactor"}
                  element={<RegisterForm />}
                />
                <Route path={"/YupForm"} element={<YupForm />} />
                {/* Task 03 Oct */}
                <Route
                  path={"/state-change-observer"}
                  element={<StateChangeObserver />}
                />
                <Route
                  path={"/migrating-lifecycle-methods"}
                  element={<MigratingLifecycleMethods />}
                />
                <Route
                  path={"/dynamic-title-updater"}
                  element={<DynamicTitleUpdater />}
                />
                <Route
                  path={"/cleanup-logic-simulation"}
                  element={<CleanupLogicSimulation />}
                />
                <Route
                  path={"/lifecycle-performance-audit"}
                  element={<LifecyclePerformanceAudit />}
                />

                <Route
                  path={"/setting-up-navigation-foundation"}
                  element={<SettingUpNavigationFoundation />}
                />
                <Route
                  path={"/structuring-routes"}
                  element={<StructuringRoutes />}
                />
                <Route
                  path={"/implementing-navigation-elements"}
                  element={<ImplementingNavigationElements />}
                />
                <Route
                  path={"/user-profiles/name"}
                  element={<DynamicRoutingUserProfile />}
                />
                <Route path={"/not-found"} element={<NotFound />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
