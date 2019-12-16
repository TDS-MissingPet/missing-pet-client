import React, { useCallback } from 'react';
import { Modal, ModalProps } from 'react-bootstrap';

import CreateAdForm from '../create-ad-form';

interface Props extends ModalProps {
  onSubmit: (values: any) => any;
}

const CreateAdModal: React.SFC<Props> = ({ show, onHide = () => {}, onSubmit }) => {
  const handleSubmit = useCallback((values: any) => {
    onSubmit(values);
    onHide();
  }, [onSubmit, onHide]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create new advertisement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {show ? <CreateAdForm onSubmit={handleSubmit} onClose={onHide} /> : null}
      </Modal.Body>
    </Modal>
  );
};

export default CreateAdModal;
