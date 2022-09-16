import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Row, Container } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { PAGE_IDS } from '../utilities/PageIDs';

const formSchema = new SimpleSchema({
  emailAddress: {
    type: String,
    label: 'Email Address',
  },
  formMeasureTitle: {
    type: String,
    label: 'Measure Title',
  },
  formMeasureDate: {
    type: 'Date',
    label: 'Measure Date and Time',
  },

  formMeasureLocation: {
    type: String,
    label: 'Measure Location',
    allowedValues: ['Honolulu District Court', 'Kapolei Family Court'],
    defaultValue: 'Honolulu District Court',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const EmailForm = () => {

  /** The submit form for onSubmit type in react-bootstrap Form component */
  const submit = (data, formRef) => {
    // const { toEmail, measureTitle, measureDate, measureLocation } = data;
    // const owner = Meteor.user().username;
    // const definitionData = { toEmail, measureTitle, measureDate, measureLocation, owner };
    Meteor.call('sendEmail', (err) => {
      if (err) {
        // eslint-disable-next-line no-alert
        alert('ERROR OCCURRED');
      }
      // eslint-disable-next-line no-alert
      alert('Email Sent Successfully'); // use react alert later on
      formRef.reset();
    });
  };
  let fRef = null;
  return (
    <Container id={PAGE_IDS.EMAIL_FORM} className="py-3">
      <h3 className="text-center">Public Hearing Email Notice</h3>
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
        <Row>
          <Col>
            <TextField name="emailAddress" placeholder="Enter an email address" />
          </Col>
          <Col>
            <TextField name="formMeasureTitle" placeholder="Enter Measure Title(s) separated by commas" />
          </Col>
        </Row>
        <Row>
          <Col>
            <DateField name="formMeasureDate" />
          </Col>
          <Col>
            <SelectField name="formMeasureLocation" />
          </Col>
        </Row>
        <SubmitField value="Submit" className="my-3 justify-text-center">Submit</SubmitField>
        <ErrorsField />
      </AutoForm>
    </Container>
  );
};

export default EmailForm;
