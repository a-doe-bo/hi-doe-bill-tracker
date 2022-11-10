import React, { useState } from 'react';
import { Container, Card, Col, Row, Form, Spinner } from 'react-bootstrap';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { Testimonies } from '../../api/testimony/TestimonyCollection';
import { SavedTestimoniesCollection } from '../../api/testimony/SavedTestimoniesCollection';
import { Measures } from '../../api/measure/MeasureCollection';

/* Create schema to indicate the structure of data */
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  position: {
    type: String,
    allowedValues: ['Support', 'Oppose', 'Comments Only'],
  },
  testimony: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const DraftTestimony = () => {
  const [measureNo, setMeasureNo] = useState('');
  const [uploadFile, setUploadFile] = useState({});
  const [hasFile, setHasFile] = useState(false);

  const { measureName, ready } = useTracker(() => {
    const subscription = Measures.subscribeMeasures();
    // Determine if the subscription is ready
    const rdy = subscription.ready();

    const measureItems = Measures.find({}, { sort: { name: 1 } }).fetch();
    const measurename = measureItems.map((measure) => measure.measureNo);
    return {
      measureName: measurename,
      ready: rdy,
    };
  }, []);

  const submit = (data, formRef) => {
    const owner = Meteor.user().username;
    const collectionName = Testimonies.getCollectionName();
    const definitionData = { ...data, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Testimony successfully submitted', 'success');
        formRef.reset();
      });

    const uploadInstance = SavedTestimoniesCollection.insert({
      file: uploadFile,
      meta: {
        measureNo,
      },
    }, false);

    uploadInstance.start();
  };

  const measureSelected = (e) => {
    setMeasureNo(e.target.value);
  };

  const changed = (e) => {
    const file = e.target.files[0];
    setUploadFile(file);
    setHasFile(true);
  };

  let fRef = null;
  const checkboxStyle = { margin: '5px' };
  const menuStyle = { fontWeight: 'bold' };
  return (
    ready ? (
      <Container id={PAGE_IDS.DRAFT_TESTIMONY} className="py-3">
        <Row className="justify-content-center">
          <span style={menuStyle}>Relevant Bill</span>
          <Col id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_RELEVANT_MEASURE} style={checkboxStyle}>
            <Form.Select onChange={(e) => measureSelected(e)}>
              <option aria-label="Blank Space" />
              {measureName.map(measure => <option key={measure} value={measure}>{measure}</option>)}
            </Form.Select>
          </Col>
          <Col xs={12}>
            <Col className="text-center"><h2>Draft Testimony</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <TextField id={COMPONENT_IDS.DRAFT_TESTIMONY_FORM_FIRST_NAME} name="firstName" placeholder="Type first name here" />
                  <TextField id={COMPONENT_IDS.DRAFT_TESTIMONY_FORM_LAST_NAME} name="lastName" placeholder="Type last name here" />
                  <SelectField id={COMPONENT_IDS.DRAFT_TESTIMONY_FORM_POSITION} name="position" multiple checkboxes />
                  <h3>Type out testimony or upload pdf file</h3>
                  <LongTextField id={COMPONENT_IDS.DRAFT_TESTIMONY_FORM_SUBMIT} name="testimony" placeholder="Type testimony here..." />
                  <h5>OR</h5>
                  <Row className="mb-3">
                    <Col className="col-sm-1 col-form-label bold-text">Upload file: </Col>
                    <Col className="col-sm-9">
                      <Form.Control id="saved-testimonies" type="file" accept="application/pdf" />
                    </Col>
                  </Row>
                  <SubmitField id={COMPONENT_IDS.DRAFT_TESTIMONY_FORM_SUBMIT} value="Submit" />
                  <ErrorsField />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    ) : <Spinner> Loading </Spinner>
  );
};

export default DraftTestimony;
