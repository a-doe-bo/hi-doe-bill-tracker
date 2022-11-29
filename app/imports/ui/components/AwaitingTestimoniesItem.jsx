import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { ROUTE_PATHS } from '../utilities/RoutePaths';
import { ROLE } from '../../api/role/Role';
// eslint-disable-next-line arrow-body-style
const AwaitingTestimoniesItem = ({ awaitingTestimonies: { bill_name, bill_due_date, office, _id }, createDraft }) => {

  const { pathname } = useLocation();

  return (
    <tr>
      <td>{bill_name}</td>
      <td>{bill_due_date}</td>
      <td>{office}</td>
      <td>
        <Link className={COMPONENT_IDS.VIEW_BILL} to={`/bill/${_id}`}>View Bill</Link>
      </td>
      {(pathname === ROUTE_PATHS.DRAFT_TESTIMONY && Roles.userIsInRole(Meteor.userId(), [ROLE.WRITER])) && (
        <td>
          <Link className={COMPONENT_IDS.CREATE_DRAFT} to={`/draftTestimony/${_id}`}>Create Draft</Link>
        </td>
      )}
      {createDraft && (
        <td>
          <Link className={COMPONENT_IDS.CREATE_DRAFT} to={`/draftTestimony/${_id}`}>Create Draft</Link>
        </td>
      )}
    </tr>
  );
};

// Require a document to be passed to this component.
AwaitingTestimoniesItem.propTypes = {
  awaitingTestimonies: PropTypes.shape({
    bill_name: PropTypes.string,
    bill_due_date: PropTypes.string,
    bill_id: PropTypes.string,
    office: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  createDraft: PropTypes.bool,
};

export default AwaitingTestimoniesItem;
