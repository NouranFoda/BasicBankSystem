import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';
import "./ErrorModal.css"
const ErrorModal = props => {
  return (
    <Modal
      className ="Error-modal"
      footerClass ="Error-modal__footer"
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
