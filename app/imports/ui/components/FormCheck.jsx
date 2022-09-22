import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormCheck = ({ options, handleCheckedState }) => {
  const handleCheckChange = (e) => {
    const { value, checked } = e.target;
    handleCheckedState((prevState) => (
      (checked && !prevState.includes(value)) ? [...prevState, value] : [...prevState].filter((stat, index) => (stat !== value))
    ));
  };

  return (
    <Form>
      {options.map((label, index) => (
        <Form.Check
          label={label}
          key={index}
          value={label}
          onClick={(e) => (handleCheckChange(e))}
        />
      ))}
    </Form>
  );
};

FormCheck.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  handleCheckedState: PropTypes.func.isRequired,
};

export default FormCheck;
