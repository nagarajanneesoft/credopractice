import {
  FaHome,
  FaTasks,
  FaCalendarAlt,
  FaStar,
  FaRoute,
  FaCode,
  FaPlug,
} from "react-icons/fa";

// doubt: true kudutha "Doubt" badge kaatum
export const megaMenu = [
  {
    title: "Home",
    icon: FaHome,
    items: [
      { label: "Home", to: "/home" },
      { label: "About", to: "/about" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    title: "Task Sep",
    icon: FaTasks,
    items: [
      { label: "Color Buttons", to: "/ColorButtons" },
      { label: "Controlled Input", to: "/ControlledInput" },
      { label: "Async Counter", to: "/AsyncCounter" },
      { label: "Simple Counter", to: "/SimpleCounter" },
      { label: "Compare Form", to: "/CompareForm" },
      { label: "Fast Clicker", to: "/FastClicker" },
      { label: "Login Manual", to: "/LoginManual" },
      { label: "Login Formik", to: "/LoginFormik", doubt: true },
      { label: "Registration Formik", to: "/RegistrationFormik", doubt: true },
      {
        label: "Formik Validation Essentials",
        to: "/FormikValidation",
        doubt: true,
      },
      {
        label: "Dynamic Input Handling",
        to: "/dynamicinputhandling",
        doubt: true,
      },
      { label: "Production-Ready Form Refactor", to: "/productionrefactor" },
      { label: "Yup Form", to: "/YupForm" },
    ],
  },
  {
    title: "Task Oct",
    icon: FaCalendarAlt,
    items: [
      { label: "State Change Observer", to: "/state-change-observer" },
      {
        label: "Migrating Lifecycle Methods",
        to: "/migrating-lifecycle-methods",
      },
      { label: "Dynamic Title Updater", to: "/dynamic-title-updater" },
      {
        label: "Cleanup Logic Simulation",
        to: "/cleanup-logic-simulation",
        doubt: true,
      },
      {
        label: "Lifecycle Performance Audit",
        to: "/lifecycle-performance-audit",
        doubt: true,
      },
      {
        label: "Setting Up the Navigation Foundation",
        to: "/setting-up-navigation-foundation",
      },
      { label: "Structuring Routes", to: "/structuring-routes" },
      {
        label: "Implementing Navigation Elements",
        to: "/implementing-navigation-elements",
      },
      { label: "Dynamic Routing for User Profiles", to: "/user-profiles/name" },
      {
        label: "Advanced Directory Strategy & 404",
        to: "/advanced-directory-strategy-and-404-handling",
      },
    ],
  },
  {
    title: "Extras",
    icon: FaStar,
    items: [
      { label: "Dark & Light Theme", to: "/" },
      { label: "Auth", to: "/" },
      { label: "Translate", to: "/translate" },
      { label: "Cart Demo", to: "/cartdemo" },
      { label: "Dashboard", to: "/homedash" },
    ],
  },
  {
    title: "Practice & Routing",
    icon: FaRoute,
    items: [
      { label: "Sample Product List", to: "/sample-product-list" },
      { label: "Location Route Page", to: "/location-route-page" },
      { label: "Dynamic Route Page", to: "/dynamic-route-page" },
      { label: "Products", to: "/products" },
    ],
  },
  {
    title: "Hooks",
    icon: FaCode,
    items: [
      { label: "React Hooks", to: "/hooks" },
      { label: "useState", to: "/one" },
      { label: "useEffect", to: "/two" },
      { label: "useRef", to: "/three" },
      { label: "useMemo", to: "/four" },
      { label: "useCallback", to: "/five" },
      { label: "useReducer", to: "/six" },
      { label: "useContext", to: "/seven" },
      { label: "useCustom", to: "/eight" },
    ],
  },
  {
    title: "API",
    icon: FaPlug,
    items: [
      { label: "Fetch Method", to: "/fetch" },
      { label: "Axios Get Method", to: "/axiosget" },
      { label: "Axios Post Method", to: "/axiospost" },
      { label: "Axios New Post", to: "/axiosnewpost" },
      { label: "Axios Instance", to: "/axiosinstance" },
      { label: "Lazy Loader", to: "/lazzy" },
      { label: "Memo", to: "/memo" },
      { label: "Use Callback", to: "/call" },
      { label: "Employees", to: "/emp" },
      { label: "Bearer Token", to: "/bearer-token" },
    ],
  },
  {
    title: "Redux",
    icon: FaCode,
    items: [{ label: "Redux", to: "/redux" }],
  },
];
