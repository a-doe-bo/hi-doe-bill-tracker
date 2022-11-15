import React from 'react';
import PropTypes from 'prop-types';

const TestimonyItem = ({ testimony }) => (
  <tr>
    <td>{testimony.firstName}</td>
    <td>{testimony.lastName}</td>
    <td>{testimony.position}</td>
    <td>{testimony.testimony}</td>
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
