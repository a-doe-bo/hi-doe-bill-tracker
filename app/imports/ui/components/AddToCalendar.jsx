import React from 'react';
import { atcb_action } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddToCalendar = ({ hearingData }) => {
  const date = new Date(hearingData.dateTime);
  function formatJsDateToNormalDate(d) {
    if (d !== null) {
      const realMonth = d.getMonth() + 1;
      const month = (realMonth < 10) ? `0${realMonth}` : String(realMonth);
      const day = (d.getDate() < 10) ? `0${d.getDate()}` : String(d.getDate());

      return [d.getFullYear(), month, day].join('-');
    }
    return null;
  }
  function timeFormat(t) {
    if (t !== null) {
      const timeInHours = t.getHours();
      const timeInMinutes = (t.getMinutes()) === 0 ? '00' : String(t.getMinutes());
      return [timeInHours, timeInMinutes].join(':');
    }
    return null;
  }
  return (
    <Button
      onClick={() => {
        atcb_action({
          name: `Measure #: ${hearingData.measureNum}`,
          startDate: formatJsDateToNormalDate(date),
          endDate: formatJsDateToNormalDate(date),
          startTime: timeFormat(date),
          endTime: timeFormat(date),
          description: `${hearingData.doeStance} \n\n Room #: ${hearingData.roomNumber}`,
          location: hearingData.hearingLocation,
          options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
          timeZone: 'Pacific/Honolulu',
          iCalFileName: 'Reminder-Event',
        });
      }}
    >
      Add Hearing To Calendar
    </Button>
  );

};

AddToCalendar.propTypes = {
  hearingData: PropTypes.shape({
    hearingLocation: PropTypes.string,
    dateIntroduced: PropTypes.number,
    committeeHearing: PropTypes.string,
    measureNum: PropTypes.number,
    roomNumber: PropTypes.string,
    doeStance: PropTypes.string,
    dateTime: PropTypes.string,
  }).isRequired,
};

export default AddToCalendar;
