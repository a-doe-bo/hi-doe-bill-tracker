import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { RequestedProfiles } from '../../api/user/RequestedAccountsCollection';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  email: String,
  employeeID: String,
  password: String,
  office: { type: String, allowedValues: ['Facilities and Operations', 'Curriculum and Instructional Design', 'Fiscal Services',
      'Information Technology Services', 'Strategy, Innovation and Performance', 'Student Support Services', 'Talent Management' ]},
  role: { type: String, allowedValues: ['SECRETARY', 'WRITER', 'OFFICE APPROVER', 'PIPE APPROVER', 'FINAL APPROVER'] },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the RequestAccounts page for adding a document. */

const RequestAccounts = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const collectionName = RequestedProfiles.getCollectionName();
    const definitionData = data;
    /* Giving an error where */
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      });
  };

  let fRef = null;
  return (
    <Container id={PAGE_IDS.REQUESTED_ACCOUNTS_FORM} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Request An Account To Be Created</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME} name="firstName" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME} name="lastName" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="email" type="email" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} name="password" placeholder="Password" type="password" />
                <TextField id={COMPONENT_IDS.SIGN_UP_EMPLOYEE_ID} name="employeeID" />
                <SelectField id={COMPONENT_IDS.SIGN_UP_FORM_OFFICE} name="office" placeholder="Choose an office" />
                <SelectField id={COMPONENT_IDS.SIGN_UP_FORM_ROLE} name="role" placeholder="Choose a role" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default RequestAccounts;
