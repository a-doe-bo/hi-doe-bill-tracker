import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Pagination2 = ({ billsPerPage, totalBills, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBills / billsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="p-1">
            <Button onClick={() => paginate(number)} className="page-link">{number}</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Pagination2.propTypes = {
  billsPerPage: PropTypes.number.isRequired,
  totalBills: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination2;
