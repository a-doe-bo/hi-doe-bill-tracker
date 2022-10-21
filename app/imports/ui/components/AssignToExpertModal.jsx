import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { Experts } from '../../api/expert/ExpertCollection';

const AssignToExpertModal = ({billData: { bill_number, bill_name, bill_status, bill_hearing }}) => {
  const [show, setShow] = useState(false);
  const [recipients, setRecipients] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = () => {
    const collectionName = Experts.getCollectionName();
    const recipientsArray = recipients.split(',');
    recipientsArray.forEach((recipient) => {
      console.log(recipient);
      const definitionData = { recipient, bill_number, bill_name, bill_status, bill_hearing };
      console.log(bill_number);
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Item added successfully', 'success');
        });
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
            <Button variant="primary" type="submit" onClick={submit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AssignToExpertModal;
