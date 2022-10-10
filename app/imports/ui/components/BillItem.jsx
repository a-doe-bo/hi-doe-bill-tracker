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
import OfficePickDropdown from "./OfficePickDropdown";


const BillItem = ({ billData: { billTitle, billStatus, billNumber, billHearing, _id } }) => {
  const { pathname } = useLocation();
  const [toggle, setToggle] = useState(true);
  const [collapsableTable, setCollapsableTable] = useState(false);
  const handleToggle = (state, setState) => () => { setState(!state); };
  return (
    <>
      <tr>
        {/* TODO: Ask a question about this */}
        {/* Unknown data, RE: Thane Luna */}
        {/* <td>
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
        </td> */}
        <td className="text-center">
          <BookmarkPlusFill onClick={handleToggle(toggle, setToggle)} size={50} fill={toggle ? '#c4c4c4' : '#E7D27C'} />
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
          <td>
            <OfficePickDropdown data={{ billTitle, billStatus, billNumber, billHearing, _id }} />
          </td>
        )}
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
};

export default BillItem;
