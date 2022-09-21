import React from 'react';
import '/client/style.css';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const UserPage = () => {

  const user = {
    name: 'Very Important Person',
    email: 'john@foo.com',
    title: 'DOE Public Affairs',
    img: '/images/butterfly.png',
    role: 'Secretary',
  };

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
