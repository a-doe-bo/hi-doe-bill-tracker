import React, { useState } from 'react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { ROLE } from '../../api/role/Role';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { ApproverFlows } from '../../api/approverflow/approverflow';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from './LoadingSpinner';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const AwaitingReviewsItem = ({ awaitingReviews, measureData, createComment, editComment, accept, reject, download }) => {
  const { ready, userData } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = UserProfiles.subscribeUser();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const profileItem = UserProfiles.find({ }, {}).fetch();

    return {
      userData: profileItem,
      ready: rdy,
    };
  });

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
        // eslint-disable-next-line eqeqeq
        const pipe = userData.filter((d) => d.role == ROLE.PIPE_APPROVER);
        // emails all pipe approvers
        for (let i = 0; i < pipe.length; i++) {
          Meteor.call('workflowEmail', pipe[i].email);
        }
      } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.PIPE_APPROVER])) {
        updateData.pipeApproved = true;
        updateData.pipeApprovedDate = new Date();
        updateData.pipeApproverName = approverName;
        // eslint-disable-next-line eqeqeq
        const pipe = userData.filter((d) => d.role == ROLE.FINAL_APPROVER);
        // emails all final approvers
        for (let i = 0; i < pipe.length; i++) {
          Meteor.call('workflowEmail', pipe[i].email);
        }
      } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER])) {
        updateData.finalApproved = true;
        updateData.finalApprovedDate = new Date();
        updateData.finalApproverName = approverName;
      }
    } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE_APPROVER])) {
      updateData.writerSubmission = false;
      updateData.officeApproved = false;
      // eslint-disable-next-line eqeqeq
      const pipe = userData.filter((d) => d.role == ROLE.PIPE_APPROVER);
      // emails all pipe approvers
      for (let i = 0; i < pipe.length; i++) {
        Meteor.call('workflowEmail', pipe[i].email);
      }
    } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.PIPE_APPROVER])) {
      updateData.writerSubmission = false;
      updateData.officeApproved = false;
      updateData.pipeApproved = false;
      // eslint-disable-next-line eqeqeq
      const pipe = userData.filter((d) => d.role == ROLE.FINAL_APPROVER);
      // emails all final approvers
      for (let i = 0; i < pipe.length; i++) {
        Meteor.call('workflowEmail', pipe[i].email);
      }
    } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER])) {
      updateData.writerSubmission = false;
      updateData.officeApproved = false;
      updateData.pipeApproved = false;
      updateData.finalApproved = false;
    }
    updateMethod.callPromise(({ collectionName, updateData }))
      .catch((err) => swal('Error', err.message, 'error'))
      .then(() => {
        swal('Success', 'Status updated successfully', 'success');
      });
  };
  const handleAccept = () => {
    dataUpdate(true);
  };
  const handleReject = () => {
    dataUpdate(false);
  };
  const [downloadUrl, setUrl] = useState('');
  const handleDownload = () => {
    // awaitingReviews.originalText.slice(12)
    const storage = getStorage();
    const fileRef = ref(storage, `testimonyPdf/${awaitingReviews.originalText}`);

    getDownloadURL(fileRef).then((url) => {
      setUrl(url);
    });
  };
  /**
  const handleSendToSecretary = () => {
    console.log('Downloaded File');
  }; */
  const matchMeasureTitle = () => {
    let measureItem = {};
    if (measureData.length > 1) {
      measureItem = measureData.filter((m) => awaitingReviews.billStatus === m.status && awaitingReviews.billNumber === m.measureNumber);
    }
    return measureItem.length > 0 ? measureItem[0] : { measureTitle: awaitingReviews.billTitle, _id: awaitingReviews._id };
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
          <Link className={COMPONENT_IDS.EDIT_COMMENT} to={`/editComment/${awaitingReviews._id}`}>Edit Comment</Link>
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
      {download && (
        <td>
          {handleDownload()}
          <a href={downloadUrl} rel="noreferrer noopener" target="_blank" onDoubleClick={handleDownload}>
            <Button className={COMPONENT_IDS.DOWNLOAD} variant="secondary" onClick={handleDownload}>
              Download
            </Button>
          </a>
        </td>
      )}
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
  // eslint-disable-next-line react/require-default-props
  download: PropTypes.bool,
};

export default AwaitingReviewsItem;
