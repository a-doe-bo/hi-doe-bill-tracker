import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const AwaitingTestimoniesItem = ({awaitingTestimonies: { billName, billDueDate, _id }, createDraft, uploadDraft }) => {
  <tr>
    <td>{billName}</td>
    <td>{billDueDate}</td>
    <td>
      <Link className={COMPONENT_IDS.VIEW_BILL} to={`/bill/${_id}`}>View Bill</Link>
    </td>
    <td>
      <Link className={COMPONENT_IDS.UPLOAD_DRAFT} to={`/uploadDraft/${_id}`}>Create Draft</Link>
    </td>
    <td></td>
  </tr>
};

// Require a document to be passed to this component.
AwaitingTestimoniesItem.propTypes = {
  awaitingTestimonies: PropTypes.shape({
    billName: PropTypes.string,
    billDueDate: PropTypes.any,
    _id: PropTypes.string
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  createDraft: PropTypes.bool,
};

export default AwaitingTestimoniesItem;