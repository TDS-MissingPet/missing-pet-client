import { Link, navigate } from "@reach/router";
import { Formik } from "formik";
import { inject, observer } from "mobx-react";
import * as mobx from "mobx";
import React, { Component } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import * as yup from "yup";

import { FormError } from "../../components";
import { MIN_PASSWORD_LENGTH } from "../../shared/constants";
import { STORE_TOKEN as USER_STORE_TOKEN, UserStore } from "../../stores/user";
import { STORE_TOKEN as ADVERTISEMENT_STORE_TOKEN, AdvertisementStore } from "../../stores/advertisement";

type Props = {
  [USER_STORE_TOKEN]?: UserStore;
  [ADVERTISEMENT_STORE_TOKEN]?: AdvertisementStore
};

const schema = yup.object({
  userName: yup
    .string()
    .required("This field is required")
    .trim(),
  password: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
});

const reactions: mobx.IReactionDisposer[] = [];

@inject(USER_STORE_TOKEN, ADVERTISEMENT_STORE_TOKEN)
@observer
class LoginPage extends Component<Props> {
  componentDidMount() {
    const userStore = this.props[USER_STORE_TOKEN]!;
    const adStore = this.props[ADVERTISEMENT_STORE_TOKEN];
    adStore!.reset();

    const disposer = mobx.reaction(
      () => userStore.isAuthorized,
      () => {
        navigate("/dashboard");
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
    const userName = userStore!.isSignedUp ? userStore!.user!.userName : "";
    const password = userStore!.isSignedUp ? userStore!.user!.password : "";

    return (
      <div className="mx-auto form-container d-flex flex-column justify-content-center h-100">
        <div className="form-container__form p-3 rounded">
          <h2>Log in</h2>
          <span className="mb-2 mb-md-4 d-block text-muted">
            Please authorize to have full access to the web site.
          </span>
          <Formik
            initialValues={{ userName, password }}
            validationSchema={schema}
            onSubmit={values => userStore!.login(values)}
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
                <Form.Group controlId="userName">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={values.userName}
                    isValid={touched.userName && !errors.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.userName && !!errors.userName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.userName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
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
                <FormError text={userStore!.errorReason.get() || ""} />
                <Row className="justify-content-between align-items-center">
                  <Col md="6" xs="12" className="mb-2 mb-sm-0 ">
                    <Button
                      type="submit"
                      className="w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Spinner animation="border" /> : "Log in"}
                    </Button>
                  </Col>
                  <Col md="6" xs="12" className="text-center text-md-left">
                    <span className="d-block w-100">
                      Do not have an account?{" "}
                      <Link to="/">Create one here.</Link>
                    </span>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default LoginPage;
