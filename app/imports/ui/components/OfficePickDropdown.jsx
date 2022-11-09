import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from 'react-multi-select-component';
import swal from 'sweetalert';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PrimaryOffice } from '../../api/office/PrimaryOfficeMeasure';

const OfficePickDropdown = ({ data }) => {
  const [office, setOffice] = useState([]);
  const updateDatabase = (e) => {
    // Hearing collection
    setOffice(e);
    const collectionName = PrimaryOffice.getCollectionName();
    const definitionData = {
      measureNumber: data.bill_number,
    };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch((error) => {
        swal('Error', error.message, 'error');
      })
      .then(() => {
        swal('Success', 'Item added successfully', 'success');
      });
  };
  const options = ['Deputy', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'].map((officeOptions) => (
    { label: officeOptions, value: officeOptions }
  ));
  return (
    <MultiSelect options={options} value={office} onChange={(e) => (updateDatabase(e))} labelledBy="Select" hasSelectAll={false} />
  );
};

OfficePickDropdown.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.number,
    bill_status: PropTypes.string,
    bill_number: PropTypes.string,
    bill_hearing: PropTypes.number,
    office_primary: PropTypes.bool,
  }).isRequired,
};

export default OfficePickDropdown;
