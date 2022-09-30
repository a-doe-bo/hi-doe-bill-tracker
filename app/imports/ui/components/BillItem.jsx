import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BookmarkPlusFill, CaretDownFill, CaretRightFill } from 'react-bootstrap-icons';
import { Button, Collapse, Table } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { ROUTE_PATHS } from '../utilities/RoutePaths';


const BillItem = ({ billData: { bill_name, bill_status, bill_number, bill_hearing, _id } }) => {
  const { pathname } = useLocation();
  const [toggle, setToggle] = useState(true);
  const [collapsableTable, setCollapsableTable] = useState(false);
  const handleToggle = (state, setState) => () => { setState(!state); };
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
          <BookmarkPlusFill onClick={handleToggle(toggle, setToggle)} size={50} fill={toggle ? '#c4c4c4' : '#E7D27C'} />
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
                    <th>Committee</th>
                    <th>Committee</th>
                    <th>Committee</th>
                    <th>Committee</th>
                    <th>Committee</th>
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
                    <td>Some Data</td>
                  </tr>
                  <tr>
                    <td>Some Data</td>
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
    bill_name: PropTypes.string,
    bill_status: PropTypes.string,
    bill_hearing: PropTypes.string,
    bill_number: PropTypes.number,
  }).isRequired,
};

export default BillItem;
