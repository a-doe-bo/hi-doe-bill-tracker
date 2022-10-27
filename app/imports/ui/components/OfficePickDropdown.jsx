import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from 'react-multi-select-component';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

const OfficePickDropdown = ({ data }) => {
  const [office, setOffice] = useState([]);
  const updateDatabase = (e) => {
    // Hearing collection
    setOffice(e);
    const collectionName = Stuffs.getCollectionName();
    const definitionData = { ...data, office };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(() => {
        console.log('error');
      })
      .then(() => {
        console.log('database updated');
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
  }).isRequired,
};

export default OfficePickDropdown;
