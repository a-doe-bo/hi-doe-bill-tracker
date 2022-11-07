import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Button } from 'react-bootstrap';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { RequestedProfiles } from '../../api/user/RequestedAccountsCollection';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const RequestedProfileData = ({ requestedProfile: { email, firstName, lastName, role, employeeID, _id } }) => {
  const handleRemove = () => {
    const collectionName = RequestedProfiles.getCollectionName();
    const instance = _id;
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, this action cannot be undone',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeItMethod.callPromise({ collectionName, instance });
      }
    });
  };
  // eslint-disable-next-line no-unused-vars
  const handleAccept = () => {
    const collectionName = RequestedProfiles.getCollectionName();
    const instance = _id;
    swal({
      title: 'Are you sure?',
      text: 'Do you really want to add this User',
      buttons: true,
    }).then((willAccept) => {
      if (willAccept) {
        removeItMethod.callPromise({ collectionName, instance });
      }
    });
  };
  /* Returns a table with user information */
  console.log('profile', email, firstName, lastName, role, employeeID, _id);
  return (
    <tr>
      <td>{email}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{role}</td>
      <td>{employeeID}</td>
      <td className="text-center">
        <Button
          variant="danger"
          onClick={() => { handleRemove(); }}
        >Remove
        </Button>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
RequestedProfileData.propTypes = {
  requestedProfile: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    _id: PropTypes.string,
    role: PropTypes.string,
    userID: PropTypes.string,
    employeeID: PropTypes.string,
  }).isRequired,
};

export default RequestedProfileData;
