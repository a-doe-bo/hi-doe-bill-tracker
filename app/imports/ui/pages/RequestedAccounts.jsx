import React from 'react';
import { Button, Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const user1 = {
  first: 'Sarah',
  last: 'foo',
  email: 'Sarahfoo@aml.com',
};
const user2 = {
  first: 'Jack',
  last: 'foo',
  email: 'Jackfoo@aml.com',
};

const RequestedAccounts = () => (
  <Container id={PAGE_IDS.REQUESTED_ACCOUNTS} className="py-3">
    <h2 className="text-center">Requested Accounts</h2>
    <Row xs={1} md={2} className="justify-content-center g-4">
      <Col>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>
                {`${user1.first} ${user1.last}`}
              </Card.Title>
              <Card.Subtitle>
                {user1.email}
              </Card.Subtitle>
              <Button as="input" type="submit" className="m-4" variant="primary" value="Accept" />
              <Button as="input" type="submit" className="px-1" variant="danger" value="Decline" />
              <Card.Footer>
                <small className="text-muted">Last updated 23 mins ago</small>
              </Card.Footer>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                {`${user2.first} ${user2.last}`}
              </Card.Title>
              <Card.Subtitle>
                {user2.email}
              </Card.Subtitle>
              <Button as="input" type="submit" className="m-4" variant="primary" value="Accept" />
              <Button as="input" type="submit" className="px-1" variant="danger" value="Decline" />
              <Card.Footer>
                <small className="text-muted">Last updated 1 mins ago</small>
              </Card.Footer>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  </Container>
);

export default RequestedAccounts;
