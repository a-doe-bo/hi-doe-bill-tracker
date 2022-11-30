import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import BillTable from '../components/BillTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import Filter from '../components/Filter';
import Autocomplete from '../components/Autocomplete';
import { Saved } from '../../api/save/SavedBillCollection';
import { Hearings } from '../../api/hearing/HearingCollection';
import { Experts } from '../../api/expert/ExpertCollection';
import { PrimaryOffice } from '../../api/office/PrimaryOfficeMeasure';
import { SecondaryOffice } from '../../api/office/SecondaryOfficeMeasure';

const AssignedBills = () => {
  const { ready, experts, savedBill, hearings, primaryOffice, secondaryOffice } = useTracker(() => {
    const owner = Meteor.user() ? Meteor.user().username : '';
    const savedBillsSubscription = Saved.subscribeToSavedBill();
    const hearingBillsSubscription = Hearings.subscribeHearings();
    const expertSubscription = Experts.subscribeToExpert();
    const primaryOfficeSubscription = PrimaryOffice.subscribePrimaryOffice();
    const secondaryOfficeSubscription = SecondaryOffice.subscribeSecondaryOffice();
    const rdy = savedBillsSubscription.ready() && hearingBillsSubscription.ready() && expertSubscription.ready() && primaryOfficeSubscription.ready() && secondaryOfficeSubscription.ready();
    const savedBillItems = Saved.find({ owner }, {}).fetch();
    const hearingItems = Hearings.find({}).fetch();
    const expertItems = Experts.find({ owner }, {}).fetch();
    const primaryOfficeItems = PrimaryOffice.find({}, {}).fetch();
    const secondaryOfficeItems = SecondaryOffice.find({}, {}).fetch();
    // TODO: configure to show expert collection
    return {
      savedBill: savedBillItems,
      hearings: hearingItems,
      experts: expertItems,
      primaryOffice: primaryOfficeItems,
      secondaryOffice: secondaryOfficeItems,
      ready: rdy,
    };
  }, []);

  const [currentTab, setCurrentTab] = useState('Assigned Bills');
  const table_headers = ['', '', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill', 'Primary Office', 'Secondary Office'];
  const BillData = () => {
    let BillInformation = {};
    const returnArr = [];
    savedBill.forEach((measureData) => {
      BillInformation = {
        _id: '',
        bill_name: '',
        bill_status: '',
        bill_hearing: '',
        bill_number: '',
        bill_updated: '',
        bill_committee: '',
        bill_code: '',
        measureType: '',
        primaryOffice: [],
        secondaryOffice: [],
        primaryOfficeId: '',
        secondaryOfficeId: '',
      };
      BillInformation._id = measureData._id;
      BillInformation.bill_name = measureData.bill_name;
      BillInformation.bill_status = measureData.bill_status;
      BillInformation.bill_hearing = measureData.bill_hearing;
      BillInformation.bill_number = measureData.bill_number;
      BillInformation.bill_updated = measureData.bill_updated;
      BillInformation.bill_committee = measureData.bill_committee;
      BillInformation.bill_code = measureData.bill_code;
      BillInformation.measureType = measureData.measureType;
      primaryOffice.forEach((office) => {
        if (measureData.code === office.code && measureData.measureNumber === office.measureNumber) {
          BillInformation.primaryOffice = office.office;
          BillInformation.primaryOfficeId = office._id;
        }
      });
      secondaryOffice.forEach((office) => {
        if (measureData.code === office.code && measureData.measureNumber === office.measureNumber) {
          BillInformation.secondaryOffice = office.office;
          BillInformation.secondaryOfficeId = office._id;
        }
      });
      returnArr.push(BillInformation);
    });
    return returnArr;
  };
  const HearingData2 = hearings.map((hearingData) => ({
    hearingLocation: hearingData.room,
    dateIntroduced: hearingData.year,
    committeeHearing: hearingData.notice,
    measureNum: hearingData.measureNumber,
    roomNumber: hearingData.room,
    doeStance: hearingData.description,
    dateTime: hearingData.datetime,
  }));
  const SavedData = savedBill.map((save) => ({
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
    setData(BillData());
  }, [ready, experts]);
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
