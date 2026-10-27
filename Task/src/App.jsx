import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./assets/component/Pages/Home";
import AboutPage from "./assets/component/Pages/About";
import { Col, Container, Row } from "react-bootstrap";
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
import SampleProductList from "./assets/component/Pages/Practice/SampleProductList";
import LocationRoutePage from "./assets/component/Pages/Practice/LocationRoutePage";
import DynamicRoutePage from "./assets/component/Pages/Practice/DynamicRoutePage";
import Products from "./assets/component/Pages/Products/Products";
import ProductDetails from "./assets/component/Pages/Products/ProductDetails";
import Login from "./assets/component/Pages/Login";
import ProtectedRoute from "./assets/component/ProtectedRoute";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { authApi } from "./assets/component/Pages/ApiMethods/authApi";

import LanguageDemo from "./assets/component/Pages/LanguageDemo";
import CartDemo from "./assets/component/Pages/CartDemo";
import DashboardHooks from "./assets/component/Pages/hooks/DashboardHooks";
import One from "./assets/component/Pages/hooks/One";
import Two from "./assets/component/Pages/hooks/Two";
import Three from "./assets/component/Pages/hooks/Three";
import Four from "./assets/component/Pages/hooks/Four";
import Five from "./assets/component/Pages/hooks/Five";
import Six from "./assets/component/Pages/hooks/Six";
import Seven from "./assets/component/Pages/hooks/Seven";
import Eight from "./assets/component/Pages/hooks/Eight";
import HomeDashboard from "./assets/component/Pages/HomeDashboard";
import FetchMethods from "./assets/component/Pages/ApiMethods/FetchMethods";
import AxiosGetMethods from "./assets/component/Pages/ApiMethods/AxiosGetMethods";
import AxiosInstanceMethods from "./assets/component/Pages/ApiMethods/AxiosInstanceMethods";
import AxiosPostMethods from "./assets/component/Pages/ApiMethods/AxiosPostMethods";
import AxiosPostNew from "./assets/component/Pages/ApiMethods/AxiosPostNew";
import LazzyLoad from "./assets/component/Pages/LazzyLoad";
import MemoPage from "./assets/component/Pages/MemoPage";
import UseCallPage from "./assets/component/Pages/UseCallPage";
import Employees from "./assets/component/Pages/Employees";

function App() {
  const navigate = useNavigate();
  const hasAddedBackGuard = useRef(false);

  // Restore the user on refresh without retaining credentials or tokens.
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // user irundhum session token illana -> login illa nu eduthukkum
    if (!storedUser || !localStorage.getItem("accessToken")) return null;

    const safeUser = Object.fromEntries(
      Object.entries(storedUser).filter(
        ([key]) => key !== "accessToken" && key !== "refreshToken",
      ),
    );

    if (Object.keys(safeUser).length !== Object.keys(storedUser).length) {
      localStorage.setItem("user", JSON.stringify(safeUser));
    }

    return safeUser;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      await authApi.post("/logout"); // server la session delete
    } catch {
      /* server illa na kooda local logout nadakkum */
    }
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  // Page refresh / open pannum pothu session innum valid ah nu server kitta kekkurom
  // Expire aagiduchu na authApi (401) thaanaa login page ku anuppidum
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      authApi.get("/me").catch(() => {});
    }
  }, []);

  useLayoutEffect(() => {
    if (!user) {
      hasAddedBackGuard.current = false;
      return;
    }

    if (!hasAddedBackGuard.current) {
      window.history.pushState(window.history.state, "", window.location.href);
      hasAddedBackGuard.current = true;
    }

    const preventBackNavigation = (event) => {
      event.stopImmediatePropagation();
      window.history.go(1);
    };

    window.addEventListener("popstate", preventBackNavigation, true);

    return () => {
      window.removeEventListener("popstate", preventBackNavigation, true);
    };
  }, [user]);

  return (
    <>
      {user && <Header user={user} onLogout={handleLogout} />}
      <main className="flex-shrink-0">
        <Container>
          <Row></Row>
          <Row>
            <Col>
              <Routes>
                <Route
                  path="/login"
                  element={
                    user ? (
                      <Navigate to="/products" replace />
                    ) : (
                      <Login onLogin={handleLogin} />
                    )
                  }
                />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute user={user}>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <ProtectedRoute user={user}>
                      <AboutPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
                {/* <Route path="*" element={<NotFound />} /> */}
                <Route
                  path="/location-route-page"
                  element={<LocationRoutePage />}
                />
                <Route
                  path="/dynamic-route-page"
                  element={<DynamicRoutePage />}
                />
                <Route
                  path={"/contact"}
                  element={
                    <ProtectedRoute user={user}>
                      <Contact />
                    </ProtectedRoute>
                  }
                />
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
                <Route
                  path={"/sample-product-list"}
                  element={<SampleProductList />}
                />
                {/* 12-Oct */}
                <Route path={"/products"} element={<Products />} />
                <Route path={"/products/:id"} element={<ProductDetails />} />
                <Route
                  path="/products/category/:categoryName"
                  element={<Products />}
                />
                {/* 21-Oct */}
                <Route path={"/translate"} element={<LanguageDemo />} />
                <Route path={"/cartdemo"} element={<CartDemo />} />
                {/* <Route path={"/dash"} element={<Dashboard />} /> */}
                <Route path={"/homedash"} element={<HomeDashboard />} />
                {/* 23-Oct */}
                <Route path="/hooks" element={<DashboardHooks />} />
                <Route path="/one" element={<One />} />
                <Route path="/two" element={<Two />} />
                <Route path="/three" element={<Three />} />
                <Route path="/four" element={<Four />} />
                <Route path="/five" element={<Five />} />
                <Route path="/six" element={<Six />} />
                <Route path="/seven" element={<Seven />} />
                <Route path="/eight" element={<Eight />} />
                {/* 26-Oct */}
                <Route path="/fetch" element={<FetchMethods />} />
                <Route path="/axiosget" element={<AxiosGetMethods />} />
                <Route path="/axiospost" element={<AxiosPostMethods />} />
                <Route path="/axiosnewpost" element={<AxiosPostNew />} />
                <Route
                  path="/axiosinstance"
                  element={<AxiosInstanceMethods />}
                />
                <Route path="/lazzy" element={<LazzyLoad />} />
                <Route path="/memo" element={<MemoPage />} />
                <Route path="/call" element={<UseCallPage />} />
                <Route path="/emp" element={<Employees />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
