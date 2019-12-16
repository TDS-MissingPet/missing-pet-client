import { Link, navigate } from "@reach/router";
import { Formik } from "formik";
import * as mobx from "mobx";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import * as yup from "yup";

import { FormError } from "../../components";
import { MIN_PASSWORD_LENGTH } from "../../shared/constants";
import { STORE_TOKEN as USER_STORE_TOKEN, UserStore } from "../../stores/user";
import {
  STORE_TOKEN as NOTIFICATION_STORE_TOKEN,
  NotificationStore
} from "../../stores/notification";

type Props = {
  [USER_STORE_TOKEN]?: UserStore;
  [NOTIFICATION_STORE_TOKEN]?: NotificationStore;
};

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const schema = yup.object({
  email: yup
    .string()
    .required("This field is required")
    .trim()
    .matches(emailRegExp, "The provided string is not an email"),
  password: yup
    .string()
    .required("This field is required")
    .trim()
    .min(MIN_PASSWORD_LENGTH),
  firstName: yup
    .string()
    .required("This field is required")
    .trim(),
  lastName: yup
    .string()
    .required("This field is required")
    .trim(),
  phoneNumber: yup
    .string()
    .required("This field is required")
    .trim()
    .matches(phoneRegExp, "Phone number is not valid"),
  userName: yup
    .string()
    .required("This field is required")
    .trim()
});

const reactions: mobx.IReactionDisposer[] = [];

@inject(USER_STORE_TOKEN, NOTIFICATION_STORE_TOKEN)
@observer
class SignUpPage extends Component<Props> {
  componentDidMount() {
    const userStore = this.props[USER_STORE_TOKEN];
    const notificationStore = this.props[NOTIFICATION_STORE_TOKEN];

    const disposer = mobx.reaction(
      () => userStore!.isSignedUp,
      () => {
        notificationStore!.addNotification({
          message: "Account was created, please log in to proceed",
          type: "success"
        });
        navigate("authorization");
      }
    );
    reactions.push(disposer);
  }

  componentWillUnmount() {
    this.props[USER_STORE_TOKEN]!.resetError();
    reactions.forEach(dispose => dispose);
  }

  render() {
    const userStore = this.props[USER_STORE_TOKEN];
    const isSubmitting = userStore!.isLoading;

    return (
      <div className="mx-auto form-container d-flex flex-column justify-content-center h-100">
        <div className="form-container__form p-3 rounded">
          <h2>Sign Up</h2>
          <span className="mb-2 mb-md-4 d-block text-muted">
            Please create an account to have full access to the web site.
          </span>
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              phoneNumber: "",
              userName: ""
            }}
            validationSchema={schema}
            onSubmit={values => userStore!.createAccount(values)}
            validateOnBlur={true}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.firstName && !errors.firstName}
                      isInvalid={touched.firstName && !!errors.firstName}
                      placeholder="John"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.lastName && !errors.lastName}
                      isInvalid={touched.lastName && !!errors.lastName}
                      placeholder="Doe"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="userName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="userName"
                      value={values.userName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.userName && !errors.userName}
                      isInvalid={touched.userName && !!errors.userName}
                      placeholder="johndoe"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.userName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="phoneNumber">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      type="phone"
                      name="phoneNumber"
                      placeholder="+380*********"
                      value={values.phoneNumber}
                      isValid={touched.phoneNumber && !errors.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phoneNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="john@doe.com"
                      value={values.email}
                      isValid={touched.email && !errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      isValid={touched.password && !errors.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <FormError text={userStore!.errorReason.get() || ""} />
                <Row className="justify-content-between align-items-center">
                  <Col md="6" xs="12" className="mb-2 mb-sm-0 ">
                    <Button
                      type="submit"
                      className="w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Spinner animation="border" /> : "Submit"}
                    </Button>
                  </Col>
                  <Col md="6" xs="12" className="text-center text-md-left">
                    <span className="d-block w-100">
                      Already have an account? Click{" "}
                      <Link to="authorization">here</Link> to log in.
                    </span>
                  </Col>
                </Row>
                <Form.Text className="text-muted text-center text-md-left">
                  We'll never share your data with anyone else.
                </Form.Text>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
