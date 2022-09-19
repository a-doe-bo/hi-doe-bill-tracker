import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const AwaitingTestimoniesItem = ({ awaitingTestimonies: { bill_name, bill_due_date, office, _id }, createDraft }) => {
  return (
    <tr>
      <td>{bill_name}</td>
      <td>{bill_due_date}</td>
      <td>{office}</td>
      <td>
        <Link className={COMPONENT_IDS.VIEW_BILL} to={`/bill/${_id}`}>View Bill</Link>
      </td>
      {createDraft && (
      <td>
        <Link className={COMPONENT_IDS.CREATE_DRAFT} to={`/createDraft/${_id}`}>Create Draft</Link>
      </td>
      )}
    </tr>
  );
};

// Require a document to be passed to this component.
AwaitingTestimoniesItem.propTypes = {
  awaitingTestimonies: PropTypes.shape({
    bill_name: PropTypes.string,
    bill_due_date: PropTypes.string,
    bill_id: PropTypes.string,
    office: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  createDraft: PropTypes.bool,
};

export default AwaitingTestimoniesItem;
