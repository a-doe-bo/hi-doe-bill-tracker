import React from 'react';
import { Meteor } from 'meteor/meteor';
import '/client/style.css';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const UserPage = () => {
  const _id = Meteor.userId();
  console.log(_id);
  const { ready, data } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = UserProfiles.subscribeUser();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const profileItem = UserProfiles.find({ userID: _id }, {}).fetch();

    return {
      data: profileItem[0],
      ready: rdy,
    };
  });

  return ready ? (
    <Container id={PAGE_IDS.USER_PROFILE} className="py-3">
      <Row>
        <Col>
          <Card.Img src="/images/butterfly.png" className="col-auto img-thumbnail" style={{ width: '18rem' }} />
        </Col>
        <Col>
          <Card.Body className="text-float-left">
            <Card.Title>Name: {data.firstName} {data.lastName} </Card.Title>
            <Card.Subtitle>Email: {data.email}</Card.Subtitle>
            <Card.Text>Department: {data.title}</Card.Text>
            <Card.Text>Role: {data.role}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default UserPage;
