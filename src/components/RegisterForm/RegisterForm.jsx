import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegisterForm.module.css";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Username is too short!")
    .max(30, "Username is too long!")
    .required("Username is required"),
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

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const nameFieldId = nanoid();
  const emailFieldId = nanoid();
  const passwordFieldId = nanoid();

  const handleSubmit = (values, actions) => {
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registrationSchema}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label} htmlFor={nameFieldId}>
          Username
        </label>
        <Field
          className={css.field}
          type="text"
          name="name"
          id={nameFieldId}
        ></Field>
        <ErrorMessage className={css.error} name="name" as="span" />

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
          Register
        </button>
      </Form>
    </Formik>
  );
};
export default RegistrationForm;
