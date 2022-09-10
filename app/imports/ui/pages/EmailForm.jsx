import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Form, Button } from 'react-bootstrap';
import { Stuffs } from '../../api/stuff/StuffCollection';
import StuffItemAdmin from '../components/StuffItemAdmin';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import SimpleSchema from 'simpl-schema';
import { useParams } from 'react-router';
import { Meteor } from 'meteor/meteor';



/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const EmailForm = () => {

    const [form, setForm] = useState({ form: '' });
    const [errors, setErrors] = useState({ errors: '' });
    const setField = (field, value) => {
            setForm({
                ...form,
                [field]: value
            })

            if (!!errors[field])
                setErrors({
                    ...errors,
                    [field]: null
                })
        }
        // const schema = new SimpleSchema({
        //   measureTitle: String,
        //   measureDate: String,
        //   measureLocation: String,
        // });

    const submitForm = (e) => {
        e.preventDefault();
        Meteor.call('sendEmail', (err, res) => {
            if (err) {
                console.log('err');
            } else {
                console.log('no err');
            }
        })
    };

    return (
        <Container id={PAGE_IDS.EMAIL_FORM} className="py-3" >
            <Form onSubmit={(data) => submitForm(data)}>
                <Button type = 'submit' className = 'my-2'variant = 'primary'>Submit</Button> 
            </Form>
        </Container>
    );
};

export default EmailForm;
