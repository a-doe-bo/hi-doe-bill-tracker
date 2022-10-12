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
  const options = [
    { label: 'office 1', value: 'office 1' },
    { label: 'office 2', value: 'office 2' },
    { label: 'office 3', value: 'office 3' },
    { label: 'office 4', value: 'office 4' },
    { label: 'office 5', value: 'office 5' },
    { label: 'office 6', value: 'office 6' },
    { label: 'office 7', value: 'office 7' },
  ];
  return (
    <MultiSelect options={options} value={office} onChange={(e) => (updateDatabase(e))} labelledBy="Select" hasSelectAll={false} />
  );
};

OfficePickDropdown.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    billNumber: PropTypes.number,
    billTitle: PropTypes.string,
    billStatus: PropTypes.string,
    billHearing: PropTypes.number,
  }).isRequired,
};

export default OfficePickDropdown;
