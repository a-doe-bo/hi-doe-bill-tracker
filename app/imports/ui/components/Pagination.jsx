import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';
import BillItem from './BillItem';

let currentPage = 1;
const maxPageOptions = 10;
let minPage = 1;
let maxPage = 10;
let count = 0;
let pageArray;
const PaginationBar = ({ PaginationData: { numBills, billsPerPage } }) => {
  const numPages = Math.ceil(numBills / billsPerPage);
  count = 0;
  // CASE 1 : amount of Pages are smaller than the max
  if(numPages < maxPageOptions){
    maxPage = numPages;
  }
  // CASE 2: amount of pages are equal to or overflow maxPageOptions, NORMAL CASE
  else{
    // No adjustments needed
  }

  //STEP 2: define max and min
  minPage = currentPage - (maxPageOptions/2);
  if(minPage < 1) {
    minPage = 1;
  }
  maxPage = currentPage + (maxPageOptions/2);
  // Case 1: minPage is 1-4 so it reduces the total count by not contributing to maxPageOptions
  // Thus! we need to push it on the max side
  if(maxPage - minPage != 10){
    maxPage += (10 - (maxPage-minPage))
  }
  // Case 2: maxPage is overlimit! push excess to min to equalize to 10 or maxPageOptions
  if(maxPage > numPages){
    if(numPages < maxPageOptions){
      minPage = 1;
      maxPage = numPages;
    }
    else {
      minPage -= (maxPage - numPages);
      maxPage = numPages;
    }
  }
  count = 0;
  for(let i = minPage; minPage <= maxPage; i++){
    pageArray[count] = i;
    count++;
  }
  let pagnationElements;
  pagnationElements.p

  return <Pagination>

  </Pagination>



}
/*const PaginationBar ()
{
  <Pagination>
    <Pagination.First/>
    <Pagination.Prev/>
    <Pagination.Item>{1}</Pagination.Item>
    <Pagination.Ellipsis/>

    <Pagination.Item>{10}</Pagination.Item>
    <Pagination.Item>{11}</Pagination.Item>
    <Pagination.Item active>{12}</Pagination.Item>
    <Pagination.Item>{13}</Pagination.Item>
    <Pagination.Item disabled>{14}</Pagination.Item>

    <Pagination.Ellipsis/>
    <Pagination.Item>{20}</Pagination.Item>
    <Pagination.Next/>
    <Pagination.Last/>
  </Pagination>
};
*/
PaginationData.propTypes = {
  billData: PropTypes.shape({
    numBills: PropTypes.number.isRequired,
    billsPerPage: PropTypes.number.isRequired,
};
export default PaginationBar;
