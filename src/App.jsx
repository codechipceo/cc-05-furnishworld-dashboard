import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useResponsive } from "./Hooks/use-responsive";
import { SideDrawer } from "./Components/Drawer/Drawer";
import { Category, Products } from "./Pages/indexPages";
import PropTypes from "prop-types";
import { ProductDetail } from "./Pages/Products/ProductDetail";
import { useSelector } from "react-redux";
import { adminState } from "./Store/adminSlice";
import { Login } from "./Pages/Admin/Login";

const drawerWidth = 210;

const routes = [
  {
    element: <Category />,
    path: "/category",
  },
  {
    element: <Products />,
    path: "/products",
  },
  {
    element: <ProductDetail />,
    path: "/products/:productId",
  },
];

function App() {
  const deviceType = useResponsive();
  const {token} = useSelector(adminState);

  return (
    <>
      {!token ? (
        <Login />
      ) : (
        <>
          <BrowserRouter>
            <div style={{ display: "flex", flex: 1 }}>
              <SideDrawer />
              <div
                style={{
                  marginLeft: deviceType === "MOBILE" ? 0 : drawerWidth,
                  flex: 1,
                  overflow: "hidden",
                }}
              >
                <AppRouter routes={routes} />
              </div>
            </div>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;

const AppRouter = ({ routes }) => {
  return (
    <Routes>
      {routes.map((item, i) => {
        const { path, element } = item;

        return <Route key={path} element={element} path={path} />;
      })}
    </Routes>
  );
};

function GuardComponents({
  Component,
  userPermissions,
  allowedModule,
  allowedPermissions,
}) {
  const navigate = useNavigate();

  const userModules =
    Array.isArray(userPermissions) &&
    userPermissions?.map((module_permission) => {
      return String(module_permission).split("_").at(0);
    });

  // if (!userModules.includes(allowedModule)) {
  //   return navigate("/");
  // }

  return (
    <Component
      userModules={userModules}
      allowedPermissions={allowedPermissions}
      userPermissions={userPermissions}
    />
  );
}
GuardComponents.propTypes = {
  userPermissions: PropTypes.arrayOf(PropTypes.string),
  Component: PropTypes.func,
  allowedModule: PropTypes.string,
  allowedPermissions: PropTypes.arrayOf(PropTypes.string),
};
