import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

const AssignToExpertModal = () => {
  const [show, setShow] = useState(false);
  const [recipients, setRecipients] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = (data, formRef) => {
    const { name, quantity, condition } = data;
    const recipientsArray = recipients.split(',');
    recipientsArray.forEach((recipient) => {
      console.log(recipient);
    });
    const owner = Meteor.user().username;
    const collectionName = Stuffs.getCollectionName();
    const definitionData = { name, quantity, condition, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      });
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Assign To Expert
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Bills To Multiple Experts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Recipients</Form.Label>
              <Form.Control type="email" placeholder="Enter 1 or more emails into a comma seperated list" onChange={(e) => { setRecipients(e.target.value); }} />
              <Form.Text className="text-muted">
                Members will be notified of bill updates
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onSubmit={data => submit(data)}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AssignToExpertModal;
