import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { GrFormAdd } from 'react-icons/gr';
import { CgRemove } from 'react-icons/cg';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, BoolField, DateField, ErrorsField, ListField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { Measures } from '../../api/measure/MeasureCollection';

// A schema for a form.
const formSchema = {
  assignedBill: {
    type: String,
    allowedValues: ['Pick a bill'],
    defaultValue: 'Pick a bill',
  },
  deputy: {
    type: Boolean,
    optional: true,
  },
  ocid: {
    type: Boolean,
    optional: true,
  },
  ofo: {
    type: Boolean,
    optional: true,
  },
  ofs: {
    type: Boolean,
    optional: true,
  },
  oits: {
    type: Boolean,
    optional: true,
  },
  osip: {
    type: Boolean,
    optional: true,
  },
  osss: {
    type: Boolean,
    optional: true,
  },
  otm: {
    type: Boolean,
    optional: true,
  },
  action: String,
  actionNumber: String,
  legalType: String,
  committeeReferral: { type: Array, minCount: 1 },
  'committeeReferral.$': String,
  committeeReports: { type: Array, minCount: 1 },
  'committeeReports.$': String,
  hearingNotices: { type: Array, minCount: 1 },
  'hearingNotices.$': String,
  notifiedHearing: String,
  hearingDate: { type: Date, defaultValue: new Date() },
  hearingLocation: String,
  committee: String,
  type: String,
  leadOfficePosition: String,
};

const holdBillAllowedValues = (measures) => {
  const allowedValues = [];
  allowedValues.push('Pick a bill');
  measures.map((bill) => allowedValues.push(`#${bill.measureNumber}: ${bill.measureTitle}`));
  return allowedValues;
};

const createFormSchema = (ready, measures) => {
  if (ready) {
    formSchema.assignedBill.allowedValues = holdBillAllowedValues(measures);
    return new SimpleSchema(formSchema);
  }
  return new SimpleSchema(formSchema);
};

// Takes in the selected offices' bool values on the form and returns an array of offices the bill fits under.
const getOfficesSelected = (...officeBoolValues) => {
  const selectedOffices = [];
  const offices = ['DEPUTY', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'];

  for (let i = 0; i < officeBoolValues.length; i++) {
    if (officeBoolValues[i]) {
      selectedOffices.push(offices[i]);
    }
  }
  return selectedOffices;
};

const getChosenBillData = (billChosen, measures) => {
  let billNumberString = '';

  for (let i = 1; i < billChosen.length; i++) {
    // Exits loop once bill number is read.
    if (billChosen[i] === ':') {
      break;
    }
    billNumberString = billNumberString.concat(billChosen[i]);
  }

  // Parses the number an then searches for the bill data given the number.
  const billNumber = Number(billNumberString);
  return measures.filter((bill) => bill.measureNumber === billNumber);
};

const AssignBills = () => {
  const { ready, measures } = useTracker(() => {
    const subscription = Measures.subscribeMeasures();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const measureItems = Measures.find({}, { sort: { name: 1 } }).fetch();
    return {
      measures: measureItems,
      ready: rdy,
    };
  }, []);

  // Creates the bridge based on the data given.
  const bridge = new SimpleSchema2Bridge(createFormSchema(ready, measures));

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const {
      assignedBill,
      deputy,
      ocid,
      ofo,
      ofs,
      oits,
      osip,
      osss,
      otm,
      action,
      actionNumber,
      legalType,
      committeeReferral,
      committeeReports,
      hearingNotices,
      notifiedHearing,
      hearingDate,
      hearingLocation,
      committee,
      type,
      leadOfficePosition,
    } = data;

    // Gets the bill data from the bill title chosen.
    const filteredBillData = getChosenBillData(assignedBill, measures);
    const billData = filteredBillData[0];
    // Gets the offices from the office bool values selected.
    const office = getOfficesSelected(deputy, ocid, ofo, ofs, oits, osip, osss, otm);

    // Fills new bill data with scraper bill data.
    const billLink = billData.measureArchiveUrl;
    const billNo = billData.measureNumber;
    const status = billData.status;
    const companion = billData.companion;
    const reportTitle = billData.reportTitle;
    const measureTitle = billData.measureTitle;

    const collectionName = Measures.getCollectionName();

    const definitionData = {
      billLink,
      billNo,
      office,
      action,
      status,
      actionNumber,
      companion,
      reportTitle,
      legalType,
      committeeReferral,
      measureTitle,
      committeeReports,
      hearingNotices,
      notifiedHearing,
      hearingDate,
      hearingLocation,
      committee,
      type,
      leadOfficePosition,
    };

    // Inserts the newly created bill into the database.
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Bill added successfully', 'success');
        formRef.reset();
      });
  };

  let fRef = null;

  // Makes all office form fields capitalized.
  const officeFormStyle = { textTransform: 'uppercase' };

  return (ready ? (
    <Container id={PAGE_IDS.ASSIGN_BILLS}>
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center"><h2>Assign Bill</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row><Col><SelectField name="assignedBill" /></Col></Row>
                <Row style={officeFormStyle}>
                  <p>Offices</p>
                  <Col>
                    <BoolField name="deputy" />
                    <BoolField name="ocid" />
                  </Col>
                  <Col>
                    <BoolField name="ofo" />
                    <BoolField name="ofs" />
                  </Col>
                  <Col>
                    <BoolField name="oits" />
                    <BoolField name="osip" />
                  </Col>
                  <Col>
                    <BoolField name="osss" />
                    <BoolField name="otm" />
                  </Col>
                </Row>
                <Row>
                  <Col><TextField name="action" /></Col>
                  <Col><TextField name="actionNumber" /></Col>
                  <Col><TextField name="legalType" /></Col>
                </Row>
                <Row>
                  <Col>
                    <ListField
                      name="committeeReferral"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                  <Col>
                    <ListField
                      name="committeeReports"
                      addIcon={<GrFormAdd />}
                      initialCount="1"
                      removeIcon={<CgRemove />}
                      showInlineError
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <DateField name="hearingDate" />
                    <TextField name="notifiedHearing" />
                    <TextField name="hearingLocation" />
                    <TextField name="committee" />
                    <TextField name="type" />
                    <TextField name="leadOfficePosition" />
                  </Col>
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Data" />);
};

export default AssignBills;
