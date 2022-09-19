import React from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Button } from 'react-bootstrap';

const AwaitingTestimoniesItem = ({ awaitingTestimonies: { bill_name, bill_due_date, _id }, createDraft }) => {
  <tr>
    <td>{bill_name}</td>
    <td>{bill_due_date}</td>
    <td>
      <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/bill/${_id}`}>View Bill</Link>
    </td>
    {createDraft && (
      <td>
        <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/createDraft/${_id}`}>Create Draft</Link>
        {/*<Button onClick={<Navigate to={`/createDraft/${_id}`} />}>Create Draft</Button>*/}
      </td>
    )}
  </tr>
};

// Require a document to be passed to this component.
AwaitingTestimoniesItem.propTypes = {
  awaitingTestimonies: PropTypes.shape({
    billName: PropTypes.string,
    billDueDate: PropTypes.string,
    _id: PropTypes.string
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  createDraft: PropTypes.bool,
};

export default AwaitingTestimoniesItem;