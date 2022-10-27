import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TestimonyItem = ({ testimony }) => (
  <tr>
    <td>{testimony.firstName}</td>
    <td>{testimony.lastName}</td>
    <td>{testimony.position}</td>
    <td>{testimony.testimony}</td>
    <td><Link id="testimony-view" to={`/edittestimony/${testimony._id}`}>Edit</Link></td>
  </tr>
);

// Require a document to be passed to this component.
TestimonyItem.propTypes = {
  testimony: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    position: PropTypes.string,
    testimony: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default TestimonyItem;