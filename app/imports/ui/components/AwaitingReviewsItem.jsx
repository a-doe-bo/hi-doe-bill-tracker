import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const AwaitingReviewsItem = ({ awaitingReviews: { bill_name, bill_number, drafter_name, drafter_submitted_date, _id }, createComment, editComment }) => (
  <tr>
    <td>{drafter_name}</td>
    <td>{drafter_submitted_date}</td>
    <td>{bill_name}</td>
    <td>{bill_number}</td>
    <td>
      <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/bill/${_id}`}>View Bill</Link>
    </td>
    {/* TODO: Add link to App.jsx and Navbar.jsx */}
    {createComment && (
      <td>
        <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/createComment/${_id}`}>Create Comment</Link>
      </td>
    )}
    {/* TODO: Add link to App.jsx and Navbar.jsx */}
    {editComment && (
      <td>
        <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/editComment/${_id}`}>Edit Comment</Link>
      </td>
    )}

  </tr>
);

// Require a document to be passed to this component.
AwaitingReviewsItem.propTypes = {
  awaitingReviews: PropTypes.shape({
    bill_name: PropTypes.string,
    bill_number: PropTypes.number,
    bill_id: PropTypes.string,
    drafter_name: PropTypes.string,
    drafter_submitted_date: PropTypes.string,
    comments_on_bill: PropTypes.string,
    submitted_review: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  editComment: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  createComment: PropTypes.bool,
};

export default AwaitingReviewsItem;
