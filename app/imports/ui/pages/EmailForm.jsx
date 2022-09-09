import React, {useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import {Container, Form} from 'react-bootstrap';
import { Stuffs } from '../../api/stuff/StuffCollection';
import StuffItemAdmin from '../components/StuffItemAdmin';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import SimpleSchema from 'simpl-schema';
import { useParams } from 'react-router';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const EmailForm = () => {

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  // const schema = new SimpleSchema({
  //   measureTitle: String,
  //   measureDate: String,
  //   measureLocation: String,
  // });

  // var nodemailer = require('nodemailer');
  // var transport = nodemailer.createTransport({
  //   host: 'smtp.mailtrap.io',
  //   port: 2525,
  //   auth: {
  //     user:"f91e4031db2eda",
  //     pass:"eae77a1efc2109"
  //   }
  // });
  //
  // var mailOptions = {
  //   from: '"Example Team" <from@example.com>',
  //   to: 'user1@example.com, user2@example.com',
  //   subject: 'Nice Nodemailer test',
  //   text: 'Hey there, it’s our first message sent with Nodemailer ',
  // }
  //
  // const submit = () => {
  //
  // };
  return (
    <Container id={PAGE_IDS.EMAIL_FORM} className="py-3">
      <Form>
        <Button type='submit' className='my-2' variant='primary'>Email</Button>
      </Form>
    </Container>
  );
};

export default EmailForm;
