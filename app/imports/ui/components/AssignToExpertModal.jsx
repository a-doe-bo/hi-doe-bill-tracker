import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { Experts } from '../../api/expert/ExpertCollection';

const AssignToExpertModal = ({ billData: { bill_number, bill_name, bill_status, bill_hearing } }) => {
  const [show, setShow] = useState(false);
  const [recipients, setRecipients] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = (e) => {
    e.preventDefault();
    const secretary = Meteor.user() ? Meteor.user().username : '';
    const collectionName = Experts.getCollectionName();
    const recipientsArray = recipients.split(',');
    recipientsArray.forEach((recipient) => {
      const definitionData = { secretary, recipient, bill_number, bill_name, bill_status, bill_hearing };
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', `Bill assigned successfully to ${recipient}`, 'success');
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
AssignToExpertModal.propTypes = {
  billData: PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.string,
    bill_status: PropTypes.string,
    bill_hearing: PropTypes.string,
    bill_number: PropTypes.number,
    bill_updated: PropTypes.number,
    bill_committee: PropTypes.string,
    measureType: PropTypes.string,
    office: PropTypes.string,
  }).isRequired,
};
export default AssignToExpertModal;
