import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";

const initialValues = {
  email: "",
  password: "",
};
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, "Email is too short!")
    .max(35, "Email is too long!")
    .email("Invalid email!")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password is too short!")
    .max(20, "Password is too long!")
    .matches(/^(?=.*[0-9])/, "Password must contain at least one digit")
    .required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const emailFieldId = nanoid();
  const passwordFieldId = nanoid();

  const handleSubmit = (values, actions) => {
    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        console.log("login success");
      })
      .catch(() => {
        console.log("login error");
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label} htmlFor={emailFieldId}>
          Email
        </label>
        <Field
          className={css.field}
          type="email"
          name="email"
          id={emailFieldId}
        ></Field>
        <ErrorMessage className={css.error} name="email" as="span" />

        <label className={css.label} htmlFor={passwordFieldId}>
          Password
        </label>
        <Field
          className={css.field}
          type="password"
          name="password"
          id={passwordFieldId}
        ></Field>
        <ErrorMessage className={css.error} name="password" as="span" />

        <button className={css.button} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
};
export default LoginForm;
