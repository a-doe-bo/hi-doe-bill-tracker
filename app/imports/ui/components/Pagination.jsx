import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';

const currentPage = 1;
const maxPageOptions = 10;
let minPage = 1;
let maxPage = 10;

const PaginationBar = ({ BillData: { numBills, billsPerPage } }) => {
  const numPages = Math.ceil(numBills / billsPerPage);
  // CASE 1 : amount of Pages are smaller than the max
  if (numPages < maxPageOptions) {
    maxPage = numPages;
  }
  // CASE 2: amount of pages are equal to or overflow maxPageOptions, NORMAL CASE
  else {
    // No adjustments needed
  }

  // STEP 2: define max and min
  minPage = currentPage - (maxPageOptions/2);
  if (minPage < 1) {
    minPage = 1;
  }
  maxPage = currentPage + (maxPageOptions/2);
  // Case 1: minPage is 1-4 so it reduces the total count by not contributing to maxPageOptions
  // Thus! we need to push it on the max side
  if (maxPage - minPage !== 10){
    maxPage += (10 - (maxPage - minPage));
  }
  // Case 2: maxPage is overlimit! push excess to min to equalize to 10 or maxPageOptions
  if (maxPage > numPages){
    if (numPages < maxPageOptions){
      minPage = 1;
      maxPage = numPages;
    }
    else {
      minPage -= (maxPage - numPages);
      maxPage = numPages;
    }
  }
  const pagnationElements = [];
  pagnationElements.push(<Pagination.First />);
  pagnationElements.push(<Pagination.Prev />);

  for (let i = minPage; minPage <= maxPage; i++) {
    pagnationElements.push(<Pagination.Item>{i}</Pagination.Item>);
  }

  pagnationElements.push(<Pagination.Next />);
  pagnationElements.push(<Pagination.Last />);

  return (
    <Pagination>
      {pagnationElements}
    </Pagination>
  );

};

PaginationBar.propTypes = {
  BillData: PropTypes.shape({
    numBills: PropTypes.number.isRequired,
    billsPerPage: PropTypes.number.isRequired,
  }).isRequired,
};
export default PaginationBar;
