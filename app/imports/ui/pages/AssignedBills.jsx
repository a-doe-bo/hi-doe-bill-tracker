import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import BillTable from '../components/BillTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import Filter from '../components/Filter';
import Autocomplete from '../components/Autocomplete';
import { Measures } from '../../api/measure/MeasureCollection';
import { Saved } from '../../api/save/SavedBillCollection';
import { Hearings } from '../../api/hearing/HearingCollection';

const AssignedBills = () => {
  const { ready, measures, savedBills, hearings } = useTracker(() => {
    const owner = Meteor.user().username;
    const subscription = Measures.subscribeMeasures();
    const savedBillsSubscription = Saved.subscribeToSavedBill();
    const hearingBillsSubscription = Hearings.subscribeHearings();
    const rdy = subscription.ready() && savedBillsSubscription.ready() && hearingBillsSubscription.ready();
    const measuresItems = Measures.find({}, {}).fetch();
    const savedBillItems = Saved.find({ owner }, {}).fetch();
    const hearingItems = Hearings.find({}).fetch();
    return {
      measures: measuresItems,
      savedBills: savedBillItems,
      hearings: hearingItems,
      ready: rdy,
    };
  }, []);
  const [currentTab, setCurrentTab] = useState('Assigned Bills');
  // TODO: Object with { header: '', component: ''}
  const table_headers = ['', '', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill'];
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
  const HearingData2 = hearings.map((hearingData) => ({
    hearingLocation: hearingData.room,
    dateIntroduced: hearingData.year,
    committeeHearing: hearingData.notice,
    measureNum: hearingData.measureNumber,
    roomNumber: hearingData.room,
    doeStance: hearingData.description,
    dateTime: hearingData.datetime,
  }));
  const SavedData = savedBills.map((save) => ({
    _id: save._id,
    billNumber: save.bill_number,
    billTitle: save.bill_name,
    billStatus: save.bill_status,
    billHearing: save.bill_hearing,
    owner: save.owner,
  }));
  const [data, setData] = useState([]);
  // TODO: Remove this once we have our API set up and split the Bill data into (upcoming bills, dead bills, bills)
  useEffect(() => {
    setData(BillData);
  }, [ready, measures]);
  const handleCurrentTab = (tabName) => {
    setCurrentTab(tabName);
  };
  const tabs = ['Assigned Bills'];
  return (ready ? (
    <Container id={PAGE_IDS.ASSIGNED_BILLS} className="py-3">
      <Row>
        <Col md={3}>
          <Filter tab={currentTab} data={data} handleDataFiltering={setData} />
        </Col>
        <Col md={7} className="mx-3">
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
                <BillTable billData={data} savedBillData={SavedData} hearingData={HearingData2} tableHeaders={table_headers} />
              </Tab>
            ))}
          </Tabs>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Measures" />);
};
export default AssignedBills;
