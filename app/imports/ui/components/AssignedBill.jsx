import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import SavedBillItem from './SavedBillItem';

const AssignedBill = ({ billData, tableHeaders }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        {tableHeaders.map((tableHeader, index) => (
          <th key={index}>{tableHeader}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {billData.map((data, index) => <SavedBillItem key={index} billData={data} />)}
    </tbody>
  </Table>
);

SavedBillItem.propTypes = {
  billData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.string,
    bill_status: PropTypes.string,
    bill_number: PropTypes.number,
    bill_hearing: PropTypes.string,
  })).isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AssignedBill;
