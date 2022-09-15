import React from 'react';
import { Container, InputGroup, Form } from 'react-bootstrap';

const ListAwaitingReview = () => (
  <Container>
    <InputGroup>
      <Form.Control placeholder="Comment" as="textarea" aria-label="With textarea" />
    </InputGroup>
  </Container>
);

export default ListAwaitingReview;
