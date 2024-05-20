import DocumentTitle from "../../components/Title";
import css from "./Home.module.css";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <div className={css.container}>
        <h1 className={css.title}>Contacts manager welcome page</h1>
        <p className={css.link}>
          <NavLink to="/register" className={css.span}>
            Join Now
          </NavLink>{" "}
          or{" "}
          <NavLink to="/login" className={css.span}>
            Log In
          </NavLink>{" "}
          ?
        </p>
      </div>
    </>
  );
}
