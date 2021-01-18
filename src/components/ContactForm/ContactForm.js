import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import classes from "./ContactForm.module.css";
import Button from "@material-ui/core/Button";
import emailjs from "emailjs-com";

const validationForm = Yup.object().shape({
  name: Yup.string().required("Type your name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Type your email"),
  message: Yup.string().required("Enter your message"),
  terms: Yup.bool().oneOf([true], "Accept terms")
});

const ContactForm = () => {
  const sendEmail = e => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_USER_ID
      )
      .then(
        result => {
          console.log(result.text);
          // resetForm({})
        },
        error => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <h2 className={classes.title}>Contact us</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          message: "",
          terms: false
        }}
        validationSchema={validationForm}
        onSubmit={values => {
          // resetForm({})
        }}
      >
        {({ values }) => (
          <div className={classes.wrapper}>
            <Form className={classes.form} onSubmit={sendEmail}>
              <Field
                name="name"
                placeholder="Type your name"
                value={values.name}
                type="text"
                className={classes.name}
              />
              <div className={classes.errorMessage}>
                <ErrorMessage name="name" />
              </div>

              <Field
                name="email"
                placeholder="Type your email"
                value={values.email}
                type="email"
                className={classes.email}
              />
              <div className={classes.errorMessage}>
                <ErrorMessage name="email" />
              </div>

              <Field
                name="message"
                type="text"
                placeholder="Type your message..."
                component="textarea"
                value={values.message}
                className={classes.message}
              />
              <div className={classes.errorMessage}>
                <ErrorMessage name="message" />
              </div>

              <div className={classes.checkboxWrapper}>
                <Field
                  type="checkbox"
                  name="terms"
                  className={classes.checkbox}
                  id="terms"
                />
                <label htmlFor="terms" className={classes.checkboxText}>
                  Accept terms to send your message
                </label>
              </div>

              <div className={classes.errorMessage}>
                <ErrorMessage name="terms" />
              </div>

              <Button className={classes.sendButton} type="submit">
                Send
              </Button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
