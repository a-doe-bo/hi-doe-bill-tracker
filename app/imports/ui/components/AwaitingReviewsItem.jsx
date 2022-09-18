import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { ROLE } from '../../api/role/Role';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const AwaitingReviewsItem = ({ awaitingReviews: { bill_name, bill_number, drafter_name, drafter_submitted_date, office, _id }, createComment, editComment, accept, reject }) => {
  const handleAccept = () => {
    console.log('Draft Accepted');
  };
  const handleReject = () => {
    console.log('Draft Rejected');
  };
  const handleDownload = () => {
    console.log('Downloaded File');
  };
  const handleSendToSecretary = () => {
    console.log('Downloaded File');
  };
  return (
    <tr>
      <td>{drafter_name}</td>
      <td>{drafter_submitted_date}</td>
      <td>{bill_name}</td>
      <td>{bill_number}</td>
      <td>{office}</td>
      <td>
        <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/bill/${_id}`}>View Bill</Link>
      </td>
      {/* TODO: Look into cleaning this up. */}
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
      {accept && (
        <td>
          <Button className={COMPONENT_IDS.LIST_STUFF_EDIT} variant="success" onClick={handleAccept}>Accept</Button>
        </td>
      )}
      {reject && (
        <td>
          <Button className={COMPONENT_IDS.LIST_STUFF_EDIT} variant="danger" onClick={handleReject}>Reject</Button>
        </td>
      )}
      {
        Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER]) && (
          <td>
            <Button className={COMPONENT_IDS.LIST_STUFF_EDIT} variant="warning" onClick={handleSendToSecretary}>Send to secretary</Button>
          </td>
        )
      }
      <td>
        <Button className={COMPONENT_IDS.LIST_STUFF_EDIT} variant="secondary" onClick={handleDownload}>Download</Button>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
AwaitingReviewsItem.propTypes = {
  awaitingReviews: PropTypes.shape({
    bill_name: PropTypes.string,
    bill_number: PropTypes.number,
    bill_id: PropTypes.string,
    drafter_name: PropTypes.string,
    drafter_submitted_date: PropTypes.string,
    office: PropTypes.string,
    comments_on_bill: PropTypes.string,
    submitted_review: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  editComment: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  createComment: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  accept: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  reject: PropTypes.bool,
};

export default AwaitingReviewsItem;
