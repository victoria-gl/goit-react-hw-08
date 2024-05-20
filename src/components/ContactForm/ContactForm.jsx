import * as Yup from "yup";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const initialValues = {
  user: "",
  number: "",
};
const addContactSchema = Yup.object().shape({
  user: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^[0-9+-]*$/, "Invalid number format")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const userFieldId = nanoid();
  const numberFieldId = nanoid();

  const handleSubmit = (values, actions) => {
    dispatch(addContact({ name: values.user, number: values.number }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={addContactSchema}
    >
      <Form className={css["form"]}>
        <label className={css["label"]} htmlFor={userFieldId}>
          User
        </label>
        <Field
          className={css["form-field"]}
          type="text"
          name="user"
          id={userFieldId}
        ></Field>
        <ErrorMessage className={css.error} name="user" as="span" />

        <label className={css["label"]} htmlFor={numberFieldId}>
          Number
        </label>
        <Field
          className={css["form-field"]}
          type="text"
          pattern="[0-9+\-]*"
          name="number"
          id={numberFieldId}
        ></Field>
        <ErrorMessage className={css.error} name="number" as="span" />

        <button className={css["add-button"]} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
export default ContactForm;
