import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from 'react-multi-select-component';
import swal from 'sweetalert';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PrimaryOffice } from '../../api/office/PrimaryOfficeMeasure';
import { useIsMount } from '../utilities/useIsMount';
import { SecondaryOffice } from '../../api/office/SecondaryOfficeMeasure';

const OfficePickDropdown = ({ data, officeType }) => {
  const isMount = useIsMount();
  const [office, setOffice] = useState([]);
  /* Will update the office everytime our office changes */
  useEffect(() => {
    if (!isMount) {
      // if the office is null we can define the office
      const collectionName = officeType === 'Primary' ? PrimaryOffice.getCollectionName() : SecondaryOffice.getCollectionName();
      const definitionData = {
        measureNumber: data.bill_number,
        code: data.bill_code,
        office,
      };
      console.log('Defining office: ', collectionName, definitionData);
      defineMethod.callPromise({ collectionName, definitionData })
        .catch((error) => {
          swal('Error', error.message, 'error');
        })
        .then(() => {
          swal('Success', 'Item added successfully', 'success');
        });
    }
    // set the office to the value
  }, [office]);

  const options = ['Deputy', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'].map((officeOptions) => (
    { label: officeOptions, value: officeOptions }
  ));
  return (
    <MultiSelect options={options} value={office} onChange={setOffice} labelledBy="Select" hasSelectAll={false} />
  );
};

OfficePickDropdown.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.string,
    bill_status: PropTypes.string,
    bill_number: PropTypes.number,
    bill_code: PropTypes.string,
    bill_hearing: PropTypes.number,
    office_primary: PropTypes.bool,
  }).isRequired,
  officeType: PropTypes.string.isRequired,
};

export default OfficePickDropdown;
