import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { adminPage, page } from "./utils/routes";
import Layout from "./layouts/layout";
import { AuthProvider } from "./context/auth-context";
import { Suspense } from "react";
import Loader from "./components/loader";
import PrivateRoute from "./utils/private-route";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {page.map(({ path, element }, index) => (
            <Route path={path} element={element} key={index} />
          ))}
          <Route element={<PrivateRoute />}>
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <Layout />
                </Suspense>
              }
            >
              {adminPage.map(({ path, element }, index) => (
                <Route path={path} element={element} key={index} />
              ))}
              <Route path="*" element={<Navigate to={"/"} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
