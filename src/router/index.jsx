import { Navigate, Route, Routes } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";
import MainLayout from "../layout/mainLayout";
import PublicLayout from "../layout/publicLayout";
import { Fragment } from "react";
import LoginPage from "../page/guests-login/login";
import NotFoundPage from "../components/not-found";
import RegisterPage from "../page/guests-login/register";

const dynamicImportedRoutes = import.meta.glob("../page/**/**/route.js", {
  eager: true,
});

const routes = [];

Object.values(dynamicImportedRoutes).forEach((el) => {
  routes.push(...el.default);
});

const nestedRoutes = (routes) =>
  routes.map(({ Element, url, children, meta}) => {
    if (meta?.isAuth) {
      if (children?.length) {
        return (
          <Fragment key={url}>
            <Route path={url} element={<Element />} />
            {nestedRoutes(children)}
          </Fragment>
        );
      }
      return <Route key={url} path={url} element={<Element />} />;
    }
  });

function MyRoutes() {
  //   const accessToken = useAuthStore((state) => state.accessToken);
  //   const meUser = useAuthStore((state) => state.useId);

  const accessToken = localStorage.getItem("accessToken");
  
  return (
    <Routes>
      {accessToken ? (
        <Route element={<MainLayout />}>
          {nestedRoutes(routes)}
          <Route path={"/login"} element={<Navigate to={"/dashboard"} />} />
          <Route path={"/"} element={<Navigate to={"/dashboard"} />} />

          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      ) : (
        <Route element={<PublicLayout />}>
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/sign-up"} element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Route>
      )}
    </Routes>
  );
}

export default MyRoutes;
