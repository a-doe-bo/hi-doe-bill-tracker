import React from 'react';
import '/client/style.css';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(UserProfiles._schema);

const UserPage = () => {

  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to UserProfiles documents.
    const subscription = UserProfiles.subscribeUser();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = UserProfiles.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const submit = (data) => {
    const { email, password, firstName, lastName, role, assignedOffice } = data;
    const collectionName = UserProfiles.getCollectionName();
    const updateData = { id: _id, email, password, firstName, lastName, role, assignedOffice };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Profile updated successfully', 'success'));
  };

  return ready ? (
    <Container id={PAGE_IDS.USER_PROFILE} className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col><h2>Edit Account</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="email" />
                <TextField name="firstName" />
                <TextField name="lastName" />
                <TextField name="role" />
                <SubmitField value="Update Profile" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default UserPage;
