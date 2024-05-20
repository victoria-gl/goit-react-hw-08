import "./App.css";
import { useEffect, lazy } from "react";
import { Toaster } from "react-hot-toast";
import Notification from "./Notifications/Notifications";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";

const HomePage = lazy(() => import("../pages/Home/Home"));
const RegistrationPage = lazy(() => import("../pages/Register/Register"));
const LoginPage = lazy(() => import("../pages/Login/Login"));
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Notification text={"Refreshing user..."} />
  ) : (
    <Layout>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegistrationPage />}
            />
          }
        />

        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />

        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
      </Routes>
    </Layout>
  );
};
export default App;
