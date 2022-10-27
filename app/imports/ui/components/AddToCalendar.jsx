import React from 'react';
import { atcb_action } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddToCalendar = ({ data: { billTitle, billStatus, billNumber, billHearing, _id } }) => (
  <Button
    onClick={() => {
      atcb_action({
        name: billTitle,
        startDate: '2022-10-14',
        endDate: '2022-10-18',
        startTime: '10:13',
        endTime: '17:57',
        location: 'Pearl City',
        options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
        timeZone: 'Pacific/Honolulu',
        iCalFileName: 'Reminder-Event',
      });
    }}
  >
    Add Hearing To Calendar
  </Button>
);

AddToCalendar.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.number,
    bill_status: PropTypes.string,
    bill_number: PropTypes.string,
    bill_hearing: PropTypes.number,
  }).isRequired,
};

export default AddToCalendar;
