import React, { useCallback } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import startCase from "lodash/startCase";
import { Form, Row, Col, Button } from "react-bootstrap";

const validationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .transform(function(value) {
      return this.isType(value) && value !== null ? startCase(value) : value;
    })
    .required(),
  text: yup
    .string()
    .trim()
    .max(500)
    .required(),
  reward: yup
    .number()
    .positive()
    .required(),
  tags: yup.string().trim()
});

interface Props {
  onSubmit: (values: Record<string, any>) => any;
  onClose?: () => void;
}

const CreateAdForm: React.SFC<Props> = ({ onSubmit, onClose = () => {} }) => {
  const handleSubmit = useCallback(values => {
    const result: any = validationSchema.cast(values);
    if (result.tags) {
      result.tags = result.tags.split(';').filter(Boolean);
    } else {
      result.tags = [];
    }
    onSubmit(result);
  }, [onSubmit]);

  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      reward: 0,
      tags: ""
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: handleSubmit
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group controlId="addItemForm.title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="The name of the advertisement"
          value={formik.values.title}
          isValid={formik.touched.title && !formik.errors.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.title && !!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="addItemForm.text">
        <Form.Label>Text</Form.Label>
        <Form.Control
          as="textarea"
          rows="5"
          name="text"
          value={formik.values.text}
          isValid={formik.touched.text && !formik.errors.text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.text && !!formik.errors.text}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.text}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="addItemForm.reward">
        <Form.Label>Reward</Form.Label>
        <Form.Control
          type="number"
          name="reward"
          value={`${formik.values.reward}`}
          isValid={formik.touched.reward && !formik.errors.reward}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.reward && !!formik.errors.reward}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.reward}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="addItemForm.tags">
        <Form.Label>Tags</Form.Label>
        <Form.Control
          as="textarea"
          rows="5"
          name="tags"
          placeholder="tag1;tag2;tag3"
          value={formik.values.tags}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.tags && !!formik.errors.tags}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.tags}
        </Form.Control.Feedback>
        <Form.Text className="text-muted text-center text-md-left">
          Please separate your tags with semicolons
        </Form.Text>
      </Form.Group>
      <Row className="justify-content-between align-items-center">
        <Col md="6" xs="12" className="mb-2 mb-sm-0" onClick={onClose}>
          <Button type="button" variant="secondary" className="w-100">
            Cancel
          </Button>
        </Col>
        <Col md="6" xs="12" className="mb-2 mb-sm-0">
          <Button type="submit" className="w-100">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateAdForm;
