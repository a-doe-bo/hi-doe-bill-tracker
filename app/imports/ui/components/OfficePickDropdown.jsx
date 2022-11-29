import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from 'react-multi-select-component';
import swal from 'sweetalert';
import { defineMethod, updateMethod } from '../../api/base/BaseCollection.methods';
import { PrimaryOffice } from '../../api/office/PrimaryOfficeMeasure';
import { SecondaryOffice } from '../../api/office/SecondaryOfficeMeasure';

const OfficePickDropdown = ({ data, officeType }) => {
  const [office, setOffice] = useState([]);
  useEffect(() => {
    if (officeType === 'Primary') {
      setOffice(data.primaryOffice);
    } else {
      setOffice(data.secondaryOffice);
    }
  }, [data.primaryOffice, data.secondaryOffice, officeType]);

  const defineData = (e) => {
    setOffice(e);
    // if the office is null we can define the office
    const collectionName = officeType === 'Primary' ? PrimaryOffice.getCollectionName() : SecondaryOffice.getCollectionName();
    const officeId = officeType === 'Primary' ? data.primaryOfficeId : data.secondaryOfficeId;
    if (officeId) {
      const updateData = {
        id: officeId,
        measureNumber: data.bill_number,
        code: data.bill_code,
        office: e,
      };
      updateMethod.callPromise({ collectionName, updateData })
        .catch((error) => {
          swal('Error', error.message, 'error');
        })
        .then(() => {
        });
    } else {
      const definitionData = {
        measureNumber: data.bill_number,
        code: data.bill_code,
        office: e,
      };
      defineMethod.callPromise({ collectionName, definitionData })
        .catch((error) => {
          swal('Error', error.message, 'error');
        })
        .then(() => {
        });
    }

  };
  const options = ['Deputy', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'].map((officeOptions) => (
    { label: officeOptions, value: officeOptions }
  ));
  return (
    <MultiSelect options={options} value={office} onChange={defineData} labelledBy="Select" hasSelectAll={false} />
  );
};

OfficePickDropdown.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.string,
    bill_status: PropTypes.string,
    bill_hearing: PropTypes.number,
    bill_number: PropTypes.number,
    bill_code: PropTypes.string,
    bill_updated: PropTypes.number,
    bill_committee: PropTypes.string,
    measureType: PropTypes.string,
    primaryOffice: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    primaryOfficeId: PropTypes.string,
    secondaryOffice: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    secondaryOfficeId: PropTypes.string,
  }).isRequired,
  officeType: PropTypes.string.isRequired,
};

export default OfficePickDropdown;
