import { NavLink } from "react-router-dom";
import css from "./AuthNavigation.module.css";

const AuthNav = () => {
  return (
    <div className={css.linkWrap}>
      <NavLink className={css.link} to="/register">
        Register
      </NavLink>
      <NavLink className={css.link} to="/login">
        Log In
      </NavLink>
    </div>
  );
};
export default AuthNav;
