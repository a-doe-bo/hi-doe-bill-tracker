import React, { useState } from 'react';
import SimpleSchema from 'simpl-schema';
import { Alert, Button, Card, Container } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Roles } from 'meteor/alanning:roles';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { ApproverFlows } from '../../api/approverflow/approverflow';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROLE } from '../../api/role/Role';
import { updateMethod } from '../../api/base/BaseCollection.methods';

const CreateComment = () => {
  const { _id } = useParams();
  const { ready, reviewInformation } = useTracker(() => {
    const subscription = ApproverFlows.subscribeApproverFlow();
    const rdy = subscription.ready();
    const document = ApproverFlows.findDoc(_id);
    return {
      reviewInformation: document,
      ready: rdy,
    };
  }, [_id]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const schema = new SimpleSchema({
    comment: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // eslint-disable-next-line
  const submit = (doc, formRef) => {
    const collectionName = ApproverFlows.getCollectionName();
    const { comment } = doc;
    // eslint-disable-next-line no-shadow
    const { _id, writerName, officeApproverName, pipeApproverName, finalApproverName, billNumber,
      billHearing, billStatus, writerSubmission, originalText, originalWriteDate, officeApproved,
      officeApprovedDate, officeText, pipeApproved, pipeApprovedDate, pipeText, finalApproved,
      finalApprovedDate, finalText } = reviewInformation;
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
    if (Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE_APPROVER])) {
      updateData.officeText = comment;
    } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.PIPE_APPROVER])) {
      updateData.pipeText = comment;
    } else if (Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER])) {
      updateData.finalText = comment;
    }
    updateMethod.callPromise(({ collectionName, updateData }))
      .catch((err) => {
        setError(err);
        swal('Error', err.message, 'error');
      })
      .then(() => swal('Success', 'Comment created successfully', 'success'));
  };
  let fRef = null;
  return ready ? (
    <Container id={PAGE_IDS.CREATE_COMMENTS}>
      {/* eslint-disable-next-line no-restricted-globals */}
      <Button className="my-3" onClick={() => (history.back())}>Go Back</Button>
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
        <Card>
          <Card.Body>
            <LongTextField id={COMPONENT_IDS.CREATE_COMMENTS_FORM_COMMENT} name="comment" placeholder="Comments for the writer to improve their draft testimony" />
            <ErrorsField />
            <SubmitField id={COMPONENT_IDS.CREATE_COMMENTS_SUBMIT} />
          </Card.Body>
        </Card>
      </AutoForm>
      {error === '' ? (
        ''
      ) : (
        <Alert variant="danger">
          <Alert.Heading>Error Creating Comment</Alert.Heading>
          {error}
        </Alert>
      )}
    </Container>
  ) : <LoadingSpinner />;
};

export default CreateComment;
