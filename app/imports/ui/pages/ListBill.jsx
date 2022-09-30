import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  InputGroup,
  Row,
  Form,
  Tabs,
  Tab,
} from 'react-bootstrap';
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
  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  // TODO: Object with { header: '', component: ''}
  const table_headers = ['', '', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill'];
  const BillData = measures.map((stuff, index) => ({
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
  const [data, setData] = useState([]);
  // TODO: Remove this once we have our API set up and split the Bill data into (upcoming bills, dead bills, bills)
  useEffect(() => {
    setData(BillData);
  }, [ready]);
  const handleCurrentTab = (tabName) => {
    setCurrentTab(tabName);
  };
  const tabs = ['Upcoming Bills', 'Bills', 'Dead Bills'];
  return (ready ? (
    <Container id={PAGE_IDS.LIST_BILLS} className="py-3">
      <Row>
        <Col md={3}>
          {/* TODO: Make current tab switch on tab (re-rendering issue when switching tabs) */}
          {/* TODO: Pass in three sets of data to avoid re-render on tab switch */}
          <Filter tab={currentTab} data={data} handleDataFiltering={setData} />
        </Col>
        <Col md={8} className="mx-3">
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
                <BillTable billData={data} tableHeaders={table_headers} />
              </Tab>
            ))}
          </Tabs>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Stuff" />);
};

export default ListBill;
