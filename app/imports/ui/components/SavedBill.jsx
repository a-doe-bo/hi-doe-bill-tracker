import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import SavedBillItem from './SavedBillItem';

const SavedBill = ({ billData, tableHeaders, hearingData, assignExpert, trash }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        {tableHeaders.map((tableHeader, index) => (
          <th key={index}>{tableHeader}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {billData.map((data, index) => <SavedBillItem assignExpert={assignExpert} trash={trash} key={index} billData={data} hearingData={hearingData.filter((hearing) => (hearing.measureNum === data.bill_number))} />)}
    </tbody>
  </Table>
);

SavedBill.propTypes = {
  billData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.string,
    bill_status: PropTypes.string,
    bill_hearing: PropTypes.number,
    bill_number: PropTypes.number,
    bill_code: PropTypes.string,
    bill_updated: PropTypes.number,
    bill_committee: PropTypes.string,
    measureType: PropTypes.string,
    primaryOffice: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    primaryOfficeId: PropTypes.string,
    secondaryOffice: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    secondaryOfficeId: PropTypes.string,
  })).isRequired,
  hearingData: PropTypes.arrayOf(PropTypes.shape({
    hearingLocation: PropTypes.string,
    dateIntroduced: PropTypes.number,
    committeeHearing: PropTypes.string,
    measureNum: PropTypes.number,
    roomNumber: PropTypes.string,
    doeStance: PropTypes.string,
    dateTime: PropTypes.string,
  })).isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  assignExpert: PropTypes.bool.isRequired,
  trash: PropTypes.bool.isRequired,
};

export default SavedBill;
