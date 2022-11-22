import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import UserProfileData from '../components/UserProfileData';
import { ROLE } from '../../api/role/Role';

const UserPage = () => {

  // eslint-disable-next-line no-unused-vars
  const { ready, measures } = useTracker(() => {
    const rdy = subscription.ready();
    return {
      ready: rdy,
    };
  }, []);

  return ready ? <Container id={PAGE_IDS.USER_PROFILE} className="py-3">
      <Container>
        <Row>
          {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? : ([
          <Col> <UserProfileData/> </Col>,
          ])}
        </Row>
      </Container>
    </Container> : <LoadingSpinner message="Loading Measures" />;
};

export default UserPage;
