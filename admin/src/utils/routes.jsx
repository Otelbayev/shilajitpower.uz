import { lazy, Suspense } from "react";
import Loader from "../components/loader";

const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const Hero = lazy(() => import("../pages/hero"));
const Why = lazy(() => import("../pages/why"));
const Certificates = lazy(() => import("../pages/certificates"));
const Statistics = lazy(() => import("../pages/statistics"));
const Prices = lazy(() => import("../pages/prices"));
const Whom = lazy(() => import("../pages/whom"));
const Comments = lazy(() => import("../pages/comments"));
const Questions = lazy(() => import("../pages/questions"));
const Contacts = lazy(() => import("../pages/contacts"));
const Orders = lazy(() => import("../pages/orders"));

export const page = [
  {
    title: "Login",
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
];

export const adminPage = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/hero",
    element: <Hero />,
  },
  {
    path: "/why",
    element: <Why />,
  },
  {
    path: "/certificates",
    element: <Certificates />,
  },
  {
    path: "/statistics",
    element: <Statistics />,
  },
  {
    path: "/prices",
    element: <Prices />,
  },
  {
    path: "/whom",
    element: <Whom />,
  },

  {
    path: "/comments",
    element: <Comments />,
  },
  {
    path: "/questions",
    element: <Questions />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
];
