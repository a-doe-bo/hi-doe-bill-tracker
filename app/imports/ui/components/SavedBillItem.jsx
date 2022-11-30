import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { CaretDownFill, CaretRightFill, TrashFill } from 'react-bootstrap-icons';
import { Button, Collapse, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import AssignToExpertModal from './AssignToExpertModal';
import { ROLE } from '../../api/role/Role';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { Saved } from '../../api/save/SavedBillCollection';
import HearingBillData from './HearingBillData';
import { Measures } from '../../api/measure/MeasureCollection';
import LoadingSpinner from './LoadingSpinner';

const SavedBillItem = ({ assignedTo, hearingData, billData: { bill_name, bill_status, bill_number, bill_hearing, primaryOffice, secondaryOffice }, assignExpert, trash }) => {
  const { ready, savedBill } = useTracker(() => {
    const subscription = Measures.subscribeMeasures();
    const rdy = subscription.ready();
    const savedBillItem = Measures.find({ measureTitle: bill_name, status: bill_status, measureNumber: bill_number }, {}).fetch();
    return {
      savedBill: savedBillItem,
      ready: rdy,
    };
  }, []);
  const [collapsableTable, setCollapsableTable] = useState(false);
  const handleToggle = (state, setState) => () => { setState(!state); };
  const onDelete = () => {
    const collectionName = Saved.getCollectionName();
    const instance = savedBill._id;
    removeItMethod.callPromise({ collectionName, instance })
      .then(() => {
        swal('Success', 'Removed Successfully', 'success');
      })
      .catch((error) => (
        swal('Error', error.message, 'error')
      ));
  };
  console.log(assignedTo);
  const convertOfficeToString = (offices) => {
    let officeStrings = [];
    officeStrings = offices.map((office) => office.label);
    return officeStrings.join(', ');
  };
  return (ready ? (
    <>
      <tr>
        <td>
          {collapsableTable ? (
            <Button onClick={handleToggle(collapsableTable, setCollapsableTable)} aria-expanded={collapsableTable} aria-controls="collapse-table">
              <CaretDownFill size={40} />
            </Button>
          )
            : (
              <Button onClick={handleToggle(collapsableTable, setCollapsableTable)} aria-expanded={collapsableTable} aria-controls="collapse-table">
                <CaretRightFill size={40} />
              </Button>
            )}
        </td>
        <td>{bill_number}</td>
        <td>{bill_name}</td>
        <td>{bill_status}</td>
        <td>{bill_hearing}</td>
        <td>
          {savedBill.map((item) => <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/bill/${item._id}`}>View Bill</Link>)}
        </td>
        {!(Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE_APPROVER])) && primaryOffice.length > 0 ? (
          <td style={{ width: '150px' }}>
            {convertOfficeToString(primaryOffice)}
          </td>
        ) : <td>N/A</td>}
        {!(Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE_APPROVER])) && secondaryOffice.length > 0 ? (
          <td style={{ width: '150px' }}>
            {convertOfficeToString(secondaryOffice)}
          </td>
        ) : <td>N/A</td>}
        {
          (assignExpert && Roles.userIsInRole(Meteor.userId(), [ROLE.SECRETARY])) && (
            <td>
              <AssignToExpertModal billData={{ bill_number, bill_name, bill_hearing, bill_status }} />
            </td>
          )
        }
        {
          (trash && (
            <td className="text-center">
              <Button variant="danger" onClick={() => (onDelete())}><TrashFill size={20} /></Button>
            </td>
          ))
        }
      </tr>
      <tr>
        <td style={{ padding: 0 }} colSpan={10}>
          <Collapse in={collapsableTable}>
            <div id="collapse-table">
              <Table>
                <thead>
                  <tr>
                    <th>Hearing Location</th>
                    <th>Date Introduced</th>
                    <th>Committee Hearing</th>
                    <th>Room #</th>
                    <th>DOE Stance</th>
                    <th>Date/Time</th>
                  </tr>
                </thead>
                <tbody>
                  {hearingData.map((data, index) => <HearingBillData key={index} hearingData={data} />)}
                </tbody>
              </Table>
            </div>
          </Collapse>
        </td>
      </tr>
    </>
  ) : <LoadingSpinner message="Loading ..." />);
};

SavedBillItem.propTypes = {
  billData: PropTypes.shape({
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
  }).isRequired,
  hearingData: PropTypes.arrayOf(PropTypes.shape({
    hearingLocation: PropTypes.string,
    dateIntroduced: PropTypes.number,
    committeeHearing: PropTypes.string,
    measureNum: PropTypes.number,
    roomNumber: PropTypes.string,
    doeStance: PropTypes.string,
    dateTime: PropTypes.string,
  })).isRequired,
  trash: PropTypes.bool.isRequired,
  assignExpert: PropTypes.bool.isRequired,
};

export default SavedBillItem;
