import React from "react";
import { Form } from "react-bootstrap";

export interface Props {
  text: string;
}

const FormError: React.SFC<Props> = ({ text }) => {
  return text ? (
    <>
      {text.split("\n").map((reason: string, idx: number) => (
        <Form.Text className="text-center text-md-left text-danger d-block mb-1" key={idx}>
          {reason}
        </Form.Text>
      ))}
    </>
  ) : null;
};

export default FormError;
