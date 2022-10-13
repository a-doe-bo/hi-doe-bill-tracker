import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import Filter from '../components/Filter';
import Autocomplete from '../components/Autocomplete';
import AssignedBill from '../components/AssignedBill';
import { Measures } from '../../api/measure/MeasureCollection';

const AssignedBills = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, measures } = useTracker(() => {
      const subscription = Measures.subscribeMeasures();
      const rdy = subscription.ready();
      const measuresItems = Measures.find({}).fetch();
      return {
        measures: measuresItems,
        ready: rdy,
      };
    }, []);

  const [currentTab, setCurrentTab] = useState('Assigned Bills');

  const table_headers = Roles.userIsInRole(Meteor.userId(), [ROLE.SECRETARY]) ?
      ['', '', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill', 'Assign'] :
      ['', '', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill'];

  const BillData = measures.map((measureData) => ({
      _id: measureData._id,
      billTitle: measureData.measureTitle,
      billStatus: measureData.status,
      billHearing: measureData.year,
      billNumber: measureData.measureNumber,
      bill_updated: 1663711472,
      bill_committee: 'Agriculture & Environment',
      measureType: 'HB',
      office: 'office1',
    }));

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(BillData);
  }, [ready, measures]);

  const handleCurrentTab = (tabName) => {
    setCurrentTab(tabName);
  };
  const tabs = ['Assigned Bills'];
  return (ready ? (
    <Container id={PAGE_IDS.ASSIGNED_BILLS} className="py-3">
      <Row className="justify-content-center">
        <Col md={3}>
          <Filter tab={currentTab} data={data} handleDataFiltering={setData} />
        </Col>
        <Col md={7}>
          <Autocomplete billData={data} onDataFiltering={setData} />
          <Tabs
            defaultActiveKey="Assigned Bills"
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
  ) : <LoadingSpinner message="Loading Assigned Bills" />);
};

export default AssignedBills;
