import React, { useEffect, useState } from 'react';
import { Container, Card, Col, Row, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
  import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import DropboxChooser from 'react-dropbox-chooser';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { DraftATestimony } from '../../api/testimony/DraftTestimonyCollection';
import { Measures } from '../../api/measure/MeasureCollection';
import { Saved } from '../../api/save/SavedBillCollection';
import { Hearings } from '../../api/hearing/HearingCollection';
import { Experts } from '../../api/expert/ExpertCollection';
import SingleFileUpload from '../components/SingleFileUpload';

/* Create schema to indicate the structure of data */
const formSchema = new SimpleSchema({
  bill_number: Number,
  firstName: String,
  lastName: String,
  position: {
    type: String,
    defaultValue: 'Support',
    allowedValues: ['Support', 'Oppose', 'Comments Only'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const DraftTestimony = () => {
  const { ready, assignedBills } = useTracker(() => {
    const assignedSubscription = Experts.subscribeToExpert();
    const rdy = assignedSubscription.ready();
    const assignedItem = Experts.find({ }, {}).fetch();
    return {
      assignedBills: assignedItem,
      ready: rdy,
    };
  }, []);
  const assignedBillData = assignedBills.map((bill) => ({
    _id: bill._id,
    bill_number: bill.bill_number,
  }));
  const arr = [];
  assignedBills.map((bill) => (
    arr.push(bill.bill_number)
  ));
  const [billData, setData] = useState([]);
  useEffect(() => {
    setData(assignedBillData);
  }, [ready, assignedBills]);

  const submit = (data, formRef) => {
    const owner = Meteor.user().username;
    const collectionName = DraftATestimony.getCollectionName();
    const definitionData = { ...data, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Testimony successfully submitted', 'success');
        formRef.reset();
      });
  };

  return (
    <Container id={PAGE_IDS.DRAFT_TESTIMONY} className="py-3">
      <Col xs={12}>
        <Col className="text-center mb-4"><h2>Draft Testimony</h2></Col>
      </Col>
      <SingleFileUpload currBills={arr} />
    </Container>
  );
};

export default DraftTestimony;
