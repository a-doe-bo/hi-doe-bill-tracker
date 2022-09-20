import React from 'react';
import '/client/style.css';
import { Card, Container } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const UserPage = () => {

  const user = {
    name: 'Very Important Person',
    email: 'john@foo.com',
    title: 'DOE Public Affairs',
    img: '/img/butterfly.png',
    role: 'Secretary',
  };

  return (
    <Container id={PAGE_IDS.USER_PROFILE} className="py-3">
      <Card>
        <Card.Img src={user.img} className="user-profile-pic" style={{ width: '24rem' }} />
        <Card.Body className="text-left">
          <Card.Title>Name: {user.name}</Card.Title>
          <Card.Subtitle>Email: {user.email}</Card.Subtitle>
          <Card.Text>Department: {user.title}</Card.Text>
          <Card.Text>Role: {user.role}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserPage;
