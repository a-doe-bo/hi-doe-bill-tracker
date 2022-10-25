import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormCheck = ({ options, handleCheckedState, data }) => {
  const handleCheckChange = (e) => {
    const { value, checked } = e.target;
    handleCheckedState((prevState) => (
      (checked && !prevState.includes(value)) ? [...prevState, value] : [...prevState].filter((stat) => (stat !== value))
    ));
  };

  return (
    <Form>
      {options.map((label, index) => (
        <Form.Check
          label={label}
          onChange={() => {}}
          checked={data.includes(label)}
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
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
};

export default FormCheck;
