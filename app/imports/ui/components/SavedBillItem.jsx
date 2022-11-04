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
import {Measures} from '../../api/measure/MeasureCollection';
import LoadingSpinner from './LoadingSpinner';

const SavedBillItem = ({ billData: { bill_name, bill_status, bill_number, bill_hearing, _id } }) => {
  const { ready, savedBill } = useTracker(() => {
    const subscription = Measures.subscribeMeasures();
    const rdy = subscription.ready();
    const savedBillItem = Measures.find({ measureTitle: bill_name, status: bill_status, measureNumber: bill_number }, {}).fetch();
    return {
      savedBill: savedBillItem,
      ready: rdy,
    };
  }, []);
  console.log(savedBill);
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
  /* savedBill._id */
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
        {
          Roles.userIsInRole(Meteor.userId(), [ROLE.SECRETARY]) && (
            <td>
              <AssignToExpertModal billData={{ bill_number, bill_name, bill_hearing, bill_status }} />
            </td>
          )
        }
        <td className="text-center">
          <Button variant="danger" onClick={() => (onDelete())}><TrashFill size={20} /></Button>
        </td>
      </tr>
      <tr>
        <td style={{ padding: 0 }} colSpan={8}>
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
  ) : <LoadingSpinner message="Loading ..." />);
};

SavedBillItem.propTypes = {
  billData: PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.string,
    bill_status: PropTypes.string,
    bill_hearing: PropTypes.string,
    bill_number: PropTypes.number,
  }).isRequired,
};

export default SavedBillItem;
