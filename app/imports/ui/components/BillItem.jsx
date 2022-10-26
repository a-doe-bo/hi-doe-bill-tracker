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
import AddToCalendar from './AddToCalendar';
import { Saved } from '../../api/save/SavedBillCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

const BillItem = ({ savedBillData, billData: { billTitle, billStatus, billNumber, billHearing, _id } }) => {
  const save = () => {
    // insert the data into the collection
    // need to have owner in the collection
    const owner = Meteor.user().username;
    const collectionName = Saved.getCollectionName();
    const definitionData = { bill_number: billNumber, bill_name: billTitle, bill_status: billStatus, bill_hearing: billHearing, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Bookmarked Successfully', 'success');
      });
  };
  const unsaved = () => {
    console.log('unsaved');
    // remove the data from the collection
  };
  const { pathname } = useLocation();
  const [toggle, setToggle] = useState(true);
  const [collapsableTable, setCollapsableTable] = useState(false);
  const handleToggle = (state, setState) => () => {
    setState(!state);
  };
  useEffect(() => {
    const elementInSaved = savedBillData.filter((bill) => (bill.billNumber === billNumber));
    if (elementInSaved.length >= 1) {
      setToggle(false);
    }
  }, []);

  const handleSave = (state, setState) => () => {
    setState(!state);
    if (!setState) {
      unsaved();
    } else {
      save();
    }
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
        <td>{billNumber}</td>
        <td>{billTitle}</td>
        <td>{billStatus}</td>
        <td>{billHearing}</td>
        <td>
          <Link className={COMPONENT_IDS.VIEW_BILL} to={`/bill/${_id}`}>View Bill</Link>
        </td>
        {(pathname === ROUTE_PATHS.SAVED_BILLS && Roles.userIsInRole(Meteor.userId(), [ROLE.SECRETARY])) && (
          <td>
            <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/bill/${_id}`}>Assign</Link>
          </td>
        )}
        {(Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE_APPROVER])) && (
          <td style={{ width: '150px' }}>
            <OfficePickDropdown data={{ billTitle, billStatus, billNumber, billHearing, _id }} />
          </td>
        )}
        <td style={{ width: '150px' }}>
          <AddToCalendar data={{ billTitle, billStatus, billNumber, billHearing, _id }} />
        </td>
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
                  <tr>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                  </tr>
                  <tr>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                  </tr>
                  <tr>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                    <td>Some Data</td>
                  </tr>
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
    billNumber: PropTypes.number,
    billTitle: PropTypes.string,
    billStatus: PropTypes.string,
    billHearing: PropTypes.number,
  }).isRequired,
  savedBillData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    billNumber: PropTypes.number,
    billTitle: PropTypes.string,
    billStatus: PropTypes.string,
    billHearing: PropTypes.number,
    owner: PropTypes.string,
  })).isRequired,
};

export default BillItem;
