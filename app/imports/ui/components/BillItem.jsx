import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BookmarkPlusFill, CaretDownFill, CaretRightFill } from 'react-bootstrap-icons';
import { useLocation } from 'react-router';
import { Button, Collapse, Table } from 'react-bootstrap';
import swal from 'sweetalert';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { ROUTE_PATHS } from '../utilities/RoutePaths';
import OfficePickDropdown from './OfficePickDropdown';
import HearingBillData from './HearingBillData';
import { Saved } from '../../api/save/SavedBillCollection';
import { defineMethod, removeItMethod } from '../../api/base/BaseCollection.methods';

const BillItem = ({ savedBillData, hearingData, billData: { bill_name, bill_status, bill_hearing, bill_number, bill_code, primaryOffice, secondaryOffice, primaryOfficeId, secondaryOfficeId, _id } }) => {
  const collectionName = Saved.getCollectionName();
  const save = () => {
    // insert the data into the collection
    // need to have owner in the collection
    const owner = Meteor.user().username;
    const definitionData = { bill_number, bill_name, bill_status, bill_hearing, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Bookmarked Successfully', 'success');
        Meteor.call('sendEmail', owner, bill_number, (verficationError) => {
          if (verficationError) {
            // console.log('Could not Send Email');
          } else {
            // console.log(`Email sent to ${owner}`);
          }
        });
      });
  };
  const unsaved = () => {
    const instance = savedBillData.filter((sb) => (sb.billNumber === bill_number))[0]._id;
    removeItMethod.callPromise({ collectionName, instance })
      .then(() => {
        swal('Success', 'Removed Successfully', 'success');
      })
      .catch((error) => swal('Error', error.message, 'error'));
  };
  const { pathname } = useLocation();
  const [toggle, setToggle] = useState(true);
  const [collapsableTable, setCollapsableTable] = useState(false);
  const handleToggle = (state, setState) => () => {
    setState(!state);
  };
  useEffect(() => {
    const elementInSaved = savedBillData.filter((bill) => (bill.billNumber === bill_number));
    if (elementInSaved.length >= 1) {
      setToggle(false);
    }
  }, [savedBillData]);

  const convertOfficeToString = (offices) => {
    let officeStrings = [];
    officeStrings = offices.map((office) => office.label);
    return officeStrings.join(', ');
  };

  const handleSave = (state, setState) => () => {
    setState(!state);
    if (!state) {
      unsaved();
    } else {
      save();
    }
  };
  const displayOffice = (type) => {
    if (Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE_APPROVER])) {
      return '';
    }
    if (type === 'PrimaryOffice') {
      if (primaryOffice.length > 0) {
        return (
          <td>{convertOfficeToString(primaryOffice)}</td>
        );
      }
    }
    if (type === 'SecondaryOffice') {
      if (secondaryOffice.length > 0) {
        return (
          <td>{convertOfficeToString(secondaryOffice)}</td>
        );
      }
    }
    return (
      <td>N/A</td>
    );
  };
  return (
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
        <td className="text-center">
          <BookmarkPlusFill onClick={handleSave(toggle, setToggle)} size={50} fill={toggle ? '#c4c4c4' : '#E7D27C'} />
        </td>
        <td>{bill_number}</td>
        <td>{bill_name}</td>
        <td>{bill_status}</td>
        <td>{bill_hearing}</td>
        <td>
          <Link className={COMPONENT_IDS.VIEW_BILL} to={`/bill/${_id}`}>View Bill</Link>
        </td>
        {(pathname === ROUTE_PATHS.SAVED_BILLS && Roles.userIsInRole(Meteor.userId(), [ROLE.SECRETARY])) && (
          <td>
            <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/bill/${_id}`}>Assign</Link>
          </td>
        )}
        {(Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE_APPROVER])) ? (
          <td style={{ width: '150px' }}>
            <OfficePickDropdown data={{ bill_name, bill_status, bill_number, bill_hearing, bill_code, _id, primaryOfficeId, primaryOffice }} officeType="Primary" />
          </td>
        ) : ''}
        {(Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE_APPROVER])) ? (
          <td style={{ width: '150px' }}>
            <OfficePickDropdown data={{ bill_name, bill_status, bill_number, bill_hearing, bill_code, _id, secondaryOfficeId, secondaryOffice }} officeType="Secondary" />
          </td>
        ) : ''}
        {displayOffice('PrimaryOffice')}
        {displayOffice('SecondaryOffice')}
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
  );
};

BillItem.propTypes = {
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
  savedBillData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    billNumber: PropTypes.string,
    billTitle: PropTypes.string,
    billStatus: PropTypes.string,
    billHearing: PropTypes.string,
    owner: PropTypes.string,
  })).isRequired,
};

export default BillItem;
