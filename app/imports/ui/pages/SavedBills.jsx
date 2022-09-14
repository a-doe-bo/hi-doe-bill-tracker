import React, { useState } from 'react';
import { Button, Col, Container, InputGroup, Row, Form, Tabs, Tab } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../api/stuff/StuffCollection';
import BillTable from '../components/BillTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

/* Renders a table containing all of the Stuff documents. Use <BillItem> to render each row. */
const SavedBills = () => {
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
  const [searchInput, setSearchInput] = useState('');
  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  const table_headers = ['', '', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill', 'Assign to expert'];
  const BillData = stuffs.map((stuff, index) => ({
    _id: stuff._id,
    bill_name: `Bill ${index}`,
    bill_status: `Status_${index}`,
    bill_hearing: new Date().toLocaleString(),
    bill_number: index,
  }));
  return (ready ? (
    <Container id={PAGE_IDS.SAVED_BILLS} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <InputGroup className="mb-3">
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Form.Control
              value={searchInput}
              onChange={handleSearchInput}
              placeholder="Enter Bill Name, Bill #, or Bill Status"
            />
            <Button variant="outline-secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
          <Tabs
            defaultActiveKey="upcoming-hearings"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="upcoming-hearings" title="Upcoming Hearings">
              <Col className="text-center">
                <h2>Upcoming Bills</h2>
              </Col>
              <BillTable billData={BillData} tableHeaders={table_headers} />
            </Tab>
            <Tab eventKey="bills" title="Bills">
              <Col className="text-center">
                <h2>Bills</h2>
              </Col>
              <BillTable billData={BillData} tableHeaders={table_headers} />
            </Tab>
            <Tab eventKey="dead-bills" title="Dead Bills">
              <Col className="text-center">
                <h2>Dead Bills</h2>
              </Col>
              <BillTable billData={BillData} tableHeaders={table_headers} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Stuff" />);
};

export default SavedBills;
