import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

const OfficePickDropdown = ({ data }) => {
  const [office, setOffice] = useState('');
  const updateDatabase = (e) => {
    // Hearing collection
    setOffice(e.target.value);
    const collectionName = Stuffs.getCollectionName();
    const definitionData = { ...data, office };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        console.log('database updated');
      });
  };
  const officeOptions = ['office1', 'office2', 'office3', 'office4', 'office5', 'office6', 'office7'];
  return (
    <Form.Select aria-label="Default select example" onChange={(e) => (updateDatabase(e))}>
      <>
        {
          officeOptions.map((officeName, index) => (
            <option key={index}>
              <Form.Check
                type="checkbox"
                label={officeName}
              />
            </option>
          ))
        }
      </>
      <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
  );
};

OfficePickDropdown.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.string,
    bill_status: PropTypes.string,
    bill_hearing: PropTypes.string,
    bill_number: PropTypes.number,
  }).isRequired,
};

export default OfficePickDropdown;
