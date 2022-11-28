import React from 'react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { ROLE } from '../../api/role/Role';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { ApproverFlows } from '../../api/approverflow/approverflow';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const AwaitingReviewsItem = ({ awaitingReviews, measureData, createComment, editComment, accept, reject }) => {
  const collectionName = ApproverFlows.getCollectionName();
  const dataUpdate = (option) => {
    const approverName = Meteor.user().username;
    const { _id, writerName, officeApproverName, pipeApproverName, finalApproverName, billNumber,
      billHearing, billStatus, writerSubmission, originalText, originalWriteDate, officeApproved,
      officeApprovedDate, officeText, pipeApproved, pipeApprovedDate, pipeText, finalApproved,
      finalApprovedDate, finalText } = awaitingReviews;
    // update method
    const updateData = {
      id: _id,
      billNumber,
      billHearing,
      billStatus,
      originalText,
      originalWriteDate,
      writerName,
      writerSubmission,
      officeApproved,
      officeApprovedDate,
      officeApproverName,
      officeText,
      pipeApproved,
      pipeApprovedDate,
      pipeApproverName,
      pipeText,
      finalApproved,
      finalApprovedDate,
      finalApproverName,
      finalText,
    };
    if (option) {
      if (Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE_APPROVER])) {
        updateData.officeApproved = true;
        updateData.officeApprovedDate = new Date();
        updateData.officeApproverName = approverName;
      } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.PIPE_APPROVER])) {
        updateData.pipeApproved = true;
        updateData.pipeApprovedDate = new Date();
        updateData.pipeApproverName = approverName;
      } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER])) {
        updateData.finalApproved = true;
        updateData.finalApprovedDate = new Date();
        updateData.finalApproverName = approverName;
      }
    } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE_APPROVER])) {
      updateData.writerSubmission = false;
      updateData.officeApproved = false;
    } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.PIPE_APPROVER])) {
      updateData.writerSubmission = false;
      updateData.officeApproved = false;
      updateData.pipeApproved = false;
    } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER])) {
      updateData.writerSubmission = false;
      updateData.officeApproved = false;
      updateData.pipeApproved = false;
      updateData.finalApproved = false;
    }
    updateMethod.callPromise(({ collectionName, updateData }))
      .catch((err) => swal('Error', err.message, 'error'))
      .then(() => swal('Success', 'Status updated successfully', 'success'));
  };
  const handleAccept = () => {
    dataUpdate(true);
  };
  const handleReject = () => {
    dataUpdate(false);
  };
  const handleDownload = () => {
    console.log('Downloaded File');
  };
  const handleSendToSecretary = () => {
    console.log('Downloaded File');
  };
  const matchMeasureTitle = () => {
    let measureItem = {};
    if (measureData.length > 1) {
      measureItem = measureData.filter((m) => awaitingReviews.billStatus === m.status && awaitingReviews.billNumber === m.measureNumber);
    }
    return measureItem.length > 0 ? measureItem[0] : { measureTitle: 'some title', _id: '111111111111' };
  };
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
          <Link className={COMPONENT_IDS.CREATE_COMMENT} to={`/createComment/${awaitingReviews._id}`}>Create Comment</Link>
        </td>
      )}
      {editComment && (
        <td>
          <Link className={COMPONENT_IDS.EDIT_COMMENT} to={`/editComment/${matchMeasureTitle()._id}`}>Edit Comment</Link>
        </td>
      )}
      {
        (!awaitingReviews.finalApproved && Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER])) && (
          <td>
            <Button className={COMPONENT_IDS.SEND_TO_SECRETARY} variant="warning" onClick={handleAccept}>Send to secretary</Button>
          </td>
        )
      }
      {(accept && !Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER])) && (
        <td>
          <Button className={COMPONENT_IDS.ACCEPT_DRAFT} variant="success" onClick={handleAccept}>Accept</Button>
        </td>
      )}
      {reject && (
        <td>
          <Button className={COMPONENT_IDS.REJECT_DRAFT} variant="danger" onClick={handleReject}>Reject</Button>
        </td>
      )}
      <td>
        <Button className={COMPONENT_IDS.DOWNLOAD} variant="secondary" onClick={handleDownload}>Download</Button>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
AwaitingReviewsItem.propTypes = {
  awaitingReviews: PropTypes.shape({
    _id: PropTypes.string,
    billHearing: PropTypes.string,
    billNumber: PropTypes.number,
    billStatus: PropTypes.string,
    originalText: PropTypes.string,
    originalWriteDate: PropTypes.instanceOf(Date),
    writerName: PropTypes.string,
    writerSubmission: PropTypes.bool,
    officeApproved: PropTypes.bool,
    officeApprovedDate: PropTypes.instanceOf(Date),
    officeApproverName: PropTypes.string,
    officeText: PropTypes.string,
    pipeApproved: PropTypes.bool,
    pipeApprovedDate: PropTypes.instanceOf(Date),
    pipeApproverName: PropTypes.string,
    pipeText: PropTypes.string,
    finalApproved: PropTypes.bool,
    finalApprovedDate: PropTypes.instanceOf(Date),
    finalApproverName: PropTypes.string,
    finalText: PropTypes.string,
  }).isRequired,
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
