import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Users } from '../../api/user/UserCollection';

const user = {
  first: "Sarah",
  last: "foo",
  email: "Sarahfoo@aml.com",
};

const RequestedAccounts = () => {

  return (
    <Container id={PAGE_IDS.REQUESTED_ACCOUNTS} className="py-3">
      <Row className="justify-content-center">
        <h2 className="text-center">Requested Accounts</h2>
        <Col xs={3}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {user.first + " " + user.last}
                </Card.Title>
                <Card.Subtitle>
                  {user.email}
                </Card.Subtitle>
                  <Button as="input" type="submit" className="m-4" variant="primary" value="Accept" />
                  <Button as="input" type="submit" className="px-1" variant="danger" value="Decline" />
              </Card.Body>
            </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RequestedAccounts;
