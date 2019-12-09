import { Link } from '@reach/router';
import { Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as yup from 'yup';

import { MIN_PASSWORD_LENGTH } from '../../shared/constants';
import { STORE_TOKEN as USER_STORE_TOKEN, UserStore } from '../../stores/user';

type Props = {
  [USER_STORE_TOKEN]?: UserStore;
};

const schema = yup.object({
  email: yup
    .string()
    .required()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "The provided string is not an email"
    ),
  password: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
});

@inject(USER_STORE_TOKEN)
@observer
class LoginPage extends Component<Props> {
  render() {
    const userService = this.props[USER_STORE_TOKEN];
    const email = userService!.isSignedUp ? userService!.user!.email : '';
    const password = userService!.isSignedUp ? userService!.user!.password : '';

    return (
      <div className="mx-auto form-container d-flex flex-column justify-content-center h-100">
        <div className="form-container__form p-3 rounded">
          <h2>Log in</h2>
          <span className="mb-2 mb-md-4 d-block text-muted">
            Please authorize to have full access to the web site.
          </span>
          <Formik
            initialValues={{ email, password }}
            validationSchema={schema}
            onSubmit={console.log}
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
                <Form.Group controlId="email">
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
                <Row className="justify-content-between align-items-center">
                  <Col md="6" xs="12" className="mb-2 mb-sm-0 ">
                    <Button type="submit" className="w-100">
                      Log in
                    </Button>
                  </Col>
                  <Col md="6" xs="12" className="text-center text-md-left">
                    <span className="d-block w-100">
                      Do not have an account? <Link to="/">Create one here.</Link>
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
