import React from 'react';
import '/client/style.css';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import UserProfileData from '../components/UserProfileData';
import { UserProfiles } from '../../api/user/UserProfileCollection';

const UserPage = () => {
  const { ready, user } = useTracker(() => {
      const subscription = UserProfiles.subscribeUser();
      const rdy = subscription.ready();
      const users = UserProfiles.find({}).fetch();
      return {
        user: users,
        ready: rdy,
      };
    }, []);
    /*
    const UserData = user.map((userProfileData) => ({

    })
    */
  return (
    <Container id={PAGE_IDS.USER_PROFILE} className="py-3">
      <Row>
        <Col>
          <Card.Img src={user.img} className="col-auto img-thumbnail" style={{ width: '18rem' }} />
        </Col>
        <Col>
          <Card.Body className="text-float-left">
            <Card.Title>Name: {user.name}</Card.Title>
            <Card.Subtitle>Email: {user.email}</Card.Subtitle>
            <Card.Text>Department: {user.title}</Card.Text>
            <Card.Text>Role: {user.role}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
