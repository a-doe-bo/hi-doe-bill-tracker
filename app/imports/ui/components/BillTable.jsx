import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Table } from 'react-bootstrap';
import BillItem from './BillItem';

const BillTable = ({ billData, tableHeaders }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        {tableHeaders.map((tableHeader, index) => (
          <th key={index}>{tableHeader}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {billData.map((data, index) => <BillItem key={index} billData={data} />)}
    </tbody>
  </Table>
);

BillTable.propTypes = {
  billData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.string,
    bill_status: PropTypes.string,
    bill_number: PropTypes.number,
  })).isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BillTable;
