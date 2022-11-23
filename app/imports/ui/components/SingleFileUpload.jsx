import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { ref, uploadBytes } from 'firebase/storage';
import swal from 'sweetalert';
import { AutoForm, DateField, SelectField, TextField, ErrorsField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { storage } from '../../api/firebase/firebase';
import { DraftATestimony } from '../../api/testimony/DraftTestimonyCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

const formSchema = new SimpleSchema({
  bill_number: Number,
  draftDate: Date,
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
  // Parse it from the last \ of the string to find the name of the pdf
});

const bridge = new SimpleSchema2Bridge(formSchema);

const SingleFileUpload = ({ currBills }) => {
  const [pdfFile, setPDF] = useState('');
  const uploadPDF = () => {
    if (pdfFile === '') {
      alert('NO PDF FILE CHOSEN');
      return;
    }
    const pdfRef = ref(storage, `testimonyPdf/${pdfFile.name}`);
    uploadBytes(pdfRef, pdfFile).then(() => {
      // pdf uploaded
    });
  };
  const submit = (data, formRef) => {
    const owner = 'pipeapprover@foo.com';
    const collectionName = DraftATestimony.getCollectionName();
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
        <DateField name="draftDate" />
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
        <div className="py-3">
          <SubmitField />
        </div>
        <ErrorsField  />
      </AutoForm>
    </Container>
  );
};

SingleFileUpload.propTypes = {
  currBills: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SingleFileUpload;
