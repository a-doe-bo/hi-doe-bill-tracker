import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import BillItem from './BillItem';
import Pagination2 from './Pagination2';

const BillTable = ({ billData, tableHeaders, savedBillData }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [billsPerPage] = useState(270);
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = billData.slice(indexOfFirstBill, indexOfLastBill);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {tableHeaders.map((tableHeader, index) => (
              <th key={index}>{tableHeader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentBills.map((data, index) => <BillItem key={index} billData={data} savedBillData={savedBillData} />)}
        </tbody>
      </Table>
      <Pagination2 billsPerPage={billsPerPage} totalBills={billData.length} paginate={paginate} />
    </div>
  );
};

BillTable.propTypes = {
  billData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    billNumber: PropTypes.number,
    billTitle: PropTypes.string,
    billStatus: PropTypes.string,
    billHearing: PropTypes.number,
  })).isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  savedBillData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    billNumber: PropTypes.number,
    billTitle: PropTypes.string,
    billStatus: PropTypes.string,
    billHearing: PropTypes.string,
    owner: PropTypes.string,
  })).isRequired,
};

export default BillTable;
