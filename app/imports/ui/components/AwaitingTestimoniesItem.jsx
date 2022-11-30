import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

// eslint-disable-next-line arrow-body-style
const AwaitingTestimoniesItem = ({ awaitingTestimonies: { bill_name, bill_due_date, office, _id }, viewTestimony, createDraft }) => {
  return (
    <tr>
      <td>{bill_name}</td>
      <td>{bill_due_date}</td>
      <td>{office}</td>
      {viewTestimony && (
        <td>
          <Link className={COMPONENT_IDS.VIEW_DRAFT} to={`/viewTestimony/${_id}`}>View Testimony</Link>
        </td>
      )}
      {createDraft && (
        <td>
          <Link className={COMPONENT_IDS.CREATE_DRAFT} to={`/draftTestimony/${_id}`}>Create Draft</Link>
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
  viewTestimony: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  createDraft: PropTypes.bool,
};

export default AwaitingTestimoniesItem;
