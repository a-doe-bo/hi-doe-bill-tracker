import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { ROLE } from '../../api/role/Role';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const AwaitingReviewsItem = ({ awaitingReviews, measureData, createComment, editComment, accept, reject }) => {
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
  const matchMeasureTitle = () => measureData.filter((m) => awaitingReviews.billStatus === m.status && awaitingReviews.billNumber === m.measureNumber)[0];
  return (
    <tr>
      <td>{awaitingReviews.writerName}</td>
      <td>{new Date(awaitingReviews.originalWriteDate).toUTCString()}</td>
      <td>{matchMeasureTitle().measureTitle}</td>
      <td>{awaitingReviews.billNumber}</td>
      <td>
        <Link className={COMPONENT_IDS.VIEW_BILL} to={`/bill/${matchMeasureTitle()._id}`}>View Bill</Link>
      </td>
      {createComment && (
        <td>
          <Link className={COMPONENT_IDS.CREATE_COMMENT} to={`/createComment/${matchMeasureTitle()._id}`}>Create Comment</Link>
        </td>
      )}
      {editComment && (
        <td>
          <Link className={COMPONENT_IDS.EDIT_COMMENT} to={`/editComment/${matchMeasureTitle()._id}`}>Edit Comment</Link>
        </td>
      )}
      {accept && (
        <td>
          <Button className={COMPONENT_IDS.ACCEPT_DRAFT} variant="success" onClick={handleAccept}>Accept</Button>
        </td>
      )}
      {reject && (
        <td>
          <Button className={COMPONENT_IDS.REJECT_DRAFT} variant="danger" onClick={handleReject}>Reject</Button>
        </td>
      )}
      {
        Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER]) && (
          <td>
            <Button className={COMPONENT_IDS.SEND_TO_SECRETARY} variant="warning" onClick={handleSendToSecretary}>Send to secretary</Button>
          </td>
        )
      }
      <td>
        <Button className={COMPONENT_IDS.DOWNLOAD} variant="secondary" onClick={handleDownload}>Download</Button>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
AwaitingReviewsItem.propTypes = {
  awaitingReviews: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    billHearing: PropTypes.string,
    billNumber: PropTypes.number,
    billStatus: PropTypes.string,
    originalText: PropTypes.string,
    originalWriteDate: PropTypes.instanceOf(Date),
    writerName: PropTypes.string,
    writerSubmission: PropTypes.bool,
  })).isRequired,
  measureData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    bitAppropriation: PropTypes.number,
    code: PropTypes.string,
    currentReferral: PropTypes.string,
    description: PropTypes.string,
    introducer: PropTypes.string,
    lastUpdated: PropTypes.instanceOf(Date),
    measureArchiveUrl: PropTypes.string,
    measureNumber: PropTypes.number,
    measurePdfUrl: PropTypes.string,
    measureTitle: PropTypes.string,
    measureType: PropTypes.string,
    reportTitle: PropTypes.string,
    status: PropTypes.string,
    year: PropTypes.number,
  })).isRequired,
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
