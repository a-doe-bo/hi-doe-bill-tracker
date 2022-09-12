import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Button } from 'react-bootstrap';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { removeItMethod } from '../../api/base/BaseCollection.methods';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const UserProfileData = ({ userProfile: { email, firstName, lastName, role, employeeID, _id } }) => {
  const handleRemove = () => {
    const collectionName = UserProfiles.getCollectionName();
    const instance = _id;
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this user account!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeItMethod.callPromise({ collectionName, instance });
      }
    });
  };
  return (
    <tr>
      <td>{email}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{role}</td>
      <td>{employeeID}</td>
      <td className="text-center"><Button
        variant="danger"
        onClick={() => { handleRemove(); }}
      >Remove
      </Button>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
UserProfileData.propTypes = {
  userProfile: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    _id: PropTypes.string,
    role: PropTypes.string,
    userID: PropTypes.string,
    employeeID: PropTypes.string,
  }).isRequired,
};

export default UserProfileData;
