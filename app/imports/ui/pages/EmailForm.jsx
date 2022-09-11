import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Alert, Dropdown, Card, Col, Row, Container, Button } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Stuffs } from '../../api/stuff/StuffCollection';
import StuffItemAdmin from '../components/StuffItemAdmin';
import LoadingSpinner from '../components/LoadingSpinner';
import { swal } from 'sweetalert';
import { PAGE_IDS } from '../utilities/PageIDs';
import SimpleSchema from 'simpl-schema';
import { useParams } from 'react-router';



/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const EmailForm = () => {

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
                label: 'Measure Date and Time'
            },

            formMeasureLocation: { 
                type: String,
                label: 'Measure Location',
                allowedValues: ['Honolulu District Court', 'Kapolei Family Court'],
                defaultValue: 'Honolulu District Court'
            },
        });

        // add handle changes function here


        /*



        */
        const bridge = new SimpleSchema2Bridge(formSchema);

    /** The submit form for onSubmit type in react-bootstrap Form component */
    const submit = (data, formRef) => {
        const { toEmail, measureTitle, measureDate, measureLocation } = data;
        Meteor.call('sendEmail', (err) => {
            if (err) {
                alert('ERROR OCCURRED');
            }
            alert('Email Sent Successfully'); // use react alert later on
            formRef.reset();
        })
    };
    let fRef = null;
    return (
        <Container id={PAGE_IDS.EMAIL_FORM} className='py-3' >
            <h3 className='text-center'>Public Hearing Email Notice</h3>
                <AutoForm ref={ref => {fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
                    <Row>
                        <Col>
                            <TextField name='emailAddress' placeholder='Enter an email address'/>
                        </Col>
                        <Col>
                            <TextField name='formMeasureTitle' placeholder='Enter Measure Title(s) separated by commas'/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DateField name='formMeasureDate'/>
                        </Col>
                        <Col>
                            <SelectField name='formMeasureLocation'/>
                        </Col>
                    </Row>
                    <SubmitField value= 'Submit' className = 'my-3 justify-text-center'>Submit</SubmitField>
                    <ErrorsField/>
                </AutoForm>
        </Container>
    );
};

export default EmailForm;
