import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import BillTable from '../components/BillTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import Filter from '../components/Filter';
import Autocomplete from '../components/Autocomplete';
import { Measures } from '../../api/measure/MeasureCollection';

/* Renders a table containing all of the Stuff documents. Use <BillItem> to render each row. */
const AssignedBills = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stuffs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Stuffs.subscribeStuff();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Stuffs.find({}, { sort: { name: 1 } }).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);
  const [data, setData] = useState([]);

  const table_headers = Roles.userIsInRole(Meteor.userId(), [ROLE.SECRETARY]) ?
    ['', '', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill', 'Assign'] :
    ['', '', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill'];
  const BillData = stuffs.map((stuff, index) => ({
    _id: stuff._id,
    bill_name: `Bill ${index}`,
    bill_status: `Status_${index}`,
    bill_hearing: new Date().toLocaleString(),
    bill_number: index,
    bill_updated: 1663711472,
    bill_committee: 'Agriculture & Environment',
    measureType: 'HB',
    office: 'office1',
  }));
  useEffect(() => {
    setData(BillData);
  }, [ready]);
  const [currentTab, setCurrentTab] = useState('Upcoming Bills');
  const handleCurrentTab = (tabName) => {
    setCurrentTab(tabName);
  };
  return (ready ? (
    <Container id={PAGE_IDS.ASSIGNED_BILLS} className="py-3">
      <Row className="justify-content-center">
        <Col md={3}>
          <Filter tab={currentTab} data={data} handleDataFiltering={setData} />
        </Col>
        <Col md={7}>
          <Autocomplete billData={data} onDataFiltering={setData} />
          <Tabs
            defaultActiveKey="upcoming-hearings"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={(e) => (handleCurrentTab(e))}
          >
            <Tab eventKey="upcoming-hearings" title="Upcoming Hearings">
              <Col className="text-center">
                <h2>Upcoming Bills</h2>
              </Col>
              <SavedBill billData={data} tableHeaders={table_headers} />
            </Tab>
            <Tab eventKey="bills" title="Bills">
              <Col className="text-center">
                <h2>Bills</h2>
              </Col>
              <SavedBill billData={data} tableHeaders={table_headers} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading BIlls" />);
};

export default AssignedBills;