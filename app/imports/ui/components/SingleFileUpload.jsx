import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import PropTypes, { number } from 'prop-types';
import { Container } from 'react-bootstrap';
import { ref, uploadBytes } from 'firebase/storage';
import swal from 'sweetalert';
import { AutoForm, SelectField, TextField, ErrorsField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { storage } from '../../api/firebase/firebase';
import { DraftATestimony } from '../../api/testimony/DraftTestimonyCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { ApproverFlows } from '../../api/approverflow/approverflow';

const formSchema = new SimpleSchema({
  bill_number: Number,
  position: {
    type: String,
    defaultValue: 'Support',
    allowedValues: ['Support', 'Oppose', 'Comments Only'],
  },
  status: {
    type: String,
    defaultValue: 'Draft',
    allowedValues: ['Draft'],
  },
  pdfFile: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const SingleFileUpload = ({ currBills, billData }) => {
  const [pdfFile, setPDF] = useState(null);

  const uploadPDF = () => {
    if (pdfFile === null) {
      return;
    }
    const pdfRef = ref(storage, `testimonyPdf/${pdfFile.name + v4()}`);
    uploadBytes(pdfRef, pdfFile).then(() => {
    });
  };
  const submit = (data, formRef) => {
    const owner = Meteor.user().username;
    const collectionName = DraftATestimony.getCollectionName();
    const b = billData.filter((d) => (d.bill_number == data.bill_number));
    const approverFlowData = {
      collectionName: ApproverFlows.getCollectionName(),
      definitionData: {
        billNumber: parseInt(b[0].bill_number, 10),
        billHearing: b[0].bill_hearing,
        billStatus: b[0].bill_status,
        originalText: data.pdfFile,
        originalWriteDate: new Date(),
        writerSubmission: true,
      },
    };
    defineMethod.callPromise(approverFlowData);
    const definitionData = { ...data, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Testimony successfully submitted', 'success');
        uploadPDF();
        formRef.reset();
      });
  };

  let fRef = null;
  return (
    <Container>
      <AutoForm ref={refr => { fRef = refr; }} schema={bridge} onSubmit={(data) => submit(data, fRef)}>
        <SelectField name="bill_number" placeholder="Select a bill to write a testimony for" allowedValues={currBills} />
        <SelectField name="position" />
        {/* eslint-disable */}
        <TextField
          accept="application/pdf"
          name="pdfFile"
          type="file"
          onInput={(event) => {return}}
          onChangeCapture={(event) => { setPDF(event.target.files[0])}}
        />
        <TextField name="status" hidden={true} />
        <SubmitField />
        <ErrorsField  />
      </AutoForm>
    </Container>
  );
};

SingleFileUpload.propTypes = {
  billData: PropTypes.arrayOf(PropTypes.shape({
    bill_number: PropTypes.number,
    bill_hearing: PropTypes.string,
    bill_status: PropTypes.string,
  })).isRequired,
  currBills: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SingleFileUpload;
