import React from 'react';
import PropTypes from 'prop-types';
import AddToCalendar from './AddToCalendar';

const HearingBillData = ({ hearingData }) => (
  <tr>
    <td>{hearingData.hearingLocation}</td>
    <td>{hearingData.dateIntroduced}</td>
    <td>{hearingData.committeeHearing}</td>
    <td>{hearingData.roomNumber}</td>
    <td>{hearingData.doeStance}</td>
    <td>{hearingData.dateTime}</td>
    <td style={{ width: '150px' }}>
      <AddToCalendar hearingData={hearingData} />
    </td>
  </tr>
);

HearingBillData.propTypes = {
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

export default HearingBillData;
