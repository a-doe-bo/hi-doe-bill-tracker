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
  testimony: {
    type: String,
    optional: true,
  },
  hasPdf: {
    type: Boolean,
    defaultValue: false,
  },
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
    const hasDescription = Object.prototype.hasOwnProperty.call(data, 'testimony') && (data.testimony.length !== 0);

    if ((!hasFile) && !hasDescription) {
      swal('Error', 'Please provide a testimony in the box or with a PDF', 'error');
    } else if (!measureNo) {
      swal('Error', 'Select a measure to testify on', 'error');
    } else if (hasFile) {
      const uploadInstance = SavedTestimoniesCollection.insert({
        file: uploadFile,
        meta: {
          measureNo,
        },
      }, false);

      uploadInstance.start(); // Must manually start the upload
      // console.log(uploadInstance);
      const hasPdf = true;
      const definitionData = { ...data, owner, measureNo, hasPdf };
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Testimony successfully submitted', 'success')
            .then(function () {
              window.location = ('/listtestimony');
            });
          formRef.reset();
        });
      setMeasureNo('');
      setUploadFile({});
      setHasFile(false);
    } else {
      const definitionData = { ...data, owner, measureNo };
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Testimony successfully submitted', 'success')
            .then(function () {
              window.location = ('/listtestimony');
            });
          formRef.reset();
        });
      setMeasureNo('');
    }
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
  const transform = (label) => ` ${label}`;
  return (
    ready ? (
      <Container id={PAGE_IDS.DRAFT_TESTIMONY} className="py-3">
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
          <Row className="justify-content-center">
            <Col xs={12}>
              <Col className="text-center"><h2>Submit Testimony</h2></Col>
              <Card>
                <Card.Body>
                  <Row>
                    <span style={menuStyle}>Relevant Measure</span>
                    <Col id={COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_RELEVANT_MEASURE} style={checkboxStyle}>
                      <Form.Select onChange={(e) => measureSelected(e)}>
                        <option aria-label="Blank Space" />
                        {measureName.map(bill => <option key={bill} value={bill}>{bill}</option>)}
                      </Form.Select>
                    </Col>
                  </Row>
                  <TextField id={COMPONENT_IDS.DRAFT_TESTIMONY_FORM_FIRST_NAME} name="firstName" placeholder="Type first name here" />
                  <TextField id={COMPONENT_IDS.DRAFT_TESTIMONY_FORM_LAST_NAME} name="lastName" placeholder="Type last name here" />
                  <Row>
                    <Col id={COMPONENT_IDS.DRAFT_TESTIMONY_FORM_POSITION}>
                      <SelectField name="position" multiple checkboxes transform={transform} />
                    </Col>
                  </Row>
                  <h3>Type out testimony or upload pdf file</h3>
                  <LongTextField id={COMPONENT_IDS.DRAFT_TESTIMONY_CREATE} name="testimony" placeholder="Type testimony here..." />
                  <h5>OR</h5>
                  <Row className="mb-3">
                    <Col className="col-sm-1 col-form-label bold-text">Upload file: </Col>
                    <Col className="col-sm-9">
                      <Form.Control id="saved_testimonies" type="file" onChange={changed} accept="application/pdf" />
                    </Col>
                  </Row>
                  <SubmitField id={COMPONENT_IDS.DRAFT_TESTIMONY_FORM_SUBMIT} value="Submit" />
                  <ErrorsField />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </AutoForm>
      </Container>
    ) : <Spinner>Loading Testimony</Spinner>
  );
};

export default DraftTestimony;
