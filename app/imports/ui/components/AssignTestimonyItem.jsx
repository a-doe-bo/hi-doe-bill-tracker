import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { ROLE } from '../../api/role/Role';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const AssignTestimonyItem = ({ assignTestimony: { bill_name, bill_due_date, office, _id } }) => {
  const handleSendToExpert = () => {
    console.log('Downloaded File');
  };
  return (
    <tr>
      <td>{bill_name}</td>
      <td>{bill_due_date}</td>
      <td>{office}</td>
      <td>
        <Link className={COMPONENT_IDS.VIEW_BILL} to={`/bill/${_id}`}>View Bill</Link>
      </td>
      {
        Roles.userIsInRole(Meteor.userId(), [ROLE.SECRETARY]) && (
          <td>
            <Button className={COMPONENT_IDS.SEND_TO_EXPERT} variant="warning" onClick={handleSendToExpert}>Assign Testimony to Expert</Button>
          </td>
        )
      }
    </tr>
  );
};

// Require a document to be passed to this component.
AssignTestimonyItem.propTypes = {
  assignTestimony: PropTypes.shape({
    bill_name: PropTypes.string,
    bill_due_date: PropTypes.string,
    bill_id: PropTypes.string,
    office: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default AssignTestimonyItem;
