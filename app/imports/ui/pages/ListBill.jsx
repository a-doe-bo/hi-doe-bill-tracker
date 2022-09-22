import React, { useState, useRef } from 'react';
import {
  Button,
  Col,
  Container,
  InputGroup,
  Row,
  Form,
  Tabs,
  Tab,
  ButtonGroup,
  TabContainer,
  Nav
} from "react-bootstrap";
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../api/stuff/StuffCollection';
import BillTable from '../components/BillTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import Filter from '../components/Filter';

const ListBill = () => {
  const { ready, stuffs } = useTracker(() => {
    const subscription = Stuffs.subscribeStuff();
    const rdy = subscription.ready();
    const stuffItems = Stuffs.find({}, { sort: { name: 1 } }).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);
  const [searchInput, setSearchInput] = useState('');
  const [currentTab, setCurrentTab] = useState('Upcoming Bills');
  const ref = useRef();
  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  const table_headers = ['', '', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill'];
  const BillData = stuffs.map((stuff, index) => ({
    _id: stuff._id,
    bill_name: `Bill ${index}`,
    bill_status: `Status_${index}`,
    bill_hearing: new Date().toLocaleString(),
    bill_number: index,
  }));
  const handleCurrentTab = (tabName) => {
    setCurrentTab(tabName);
  };
  const test = (e) => {
    console.log(e);
  };
  console.log(currentTab);
  const tabs = ['Upcoming Bills', 'Bills', 'Dead Bills'];
  return (ready ? (
    <Container id={PAGE_IDS.LIST_BILLS} className="py-3">
      <Row>
        <Col md={3}>
          <Filter />
        </Col>
        <Col md={8}>
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
            defaultActiveKey="Upcoming Bills"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={(e) => (handleCurrentTab(e))}
          >
            {tabs.map((tab, index) => (
              <Tab eventKey={tab} title={tab} key={index}>
                <Col className="text-center">
                  <h2>{tab}</h2>
                </Col>
                <BillTable billData={BillData} tableHeaders={table_headers} />
              </Tab>
            ))}
          </Tabs>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Stuff" />);
};

export default ListBill;
