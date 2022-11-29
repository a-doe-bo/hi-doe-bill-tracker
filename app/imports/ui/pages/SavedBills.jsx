import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import SavedBill from '../components/SavedBill';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ROLE } from '../../api/role/Role';
import Autocomplete from '../components/Autocomplete';
import { Hearings } from '../../api/hearing/HearingCollection';
import { Saved } from '../../api/save/SavedBillCollection';
import Filter from '../components/Filter';
import { PrimaryOffice } from '../../api/office/PrimaryOfficeMeasure';
import { SecondaryOffice } from '../../api/office/SecondaryOfficeMeasure';

const SavedBills = () => {
  const { ready, savedBill, hearings, primaryOffice, secondaryOffice } = useTracker(() => {
    const subscription = Saved.subscribeToSavedBill();
    const hearingBillsSubscription = Hearings.subscribeHearings();
    const primaryOfficeSubscription = PrimaryOffice.subscribePrimaryOffice();
    const secondaryOfficeSubscription = SecondaryOffice.subscribeSecondaryOffice();
    const rdy = subscription.ready() && hearingBillsSubscription.ready() && primaryOfficeSubscription.ready() && secondaryOfficeSubscription.ready();
    const owner = Meteor.user().username;
    const savedBillItem = Saved.find({ owner }, {}).fetch();
    const hearingItems = Hearings.find({}).fetch();
    const primaryOfficeItems = PrimaryOffice.find({}, {}).fetch();
    const secondaryOfficeItems = SecondaryOffice.find({}, {}).fetch();
    return {
      savedBill: savedBillItem,
      hearings: hearingItems,
      primaryOffice: primaryOfficeItems,
      secondaryOffice: secondaryOfficeItems,
      ready: rdy,
    };
  }, []);
  const [data, setData] = useState([]);

  const table_headers = Roles.userIsInRole(Meteor.userId(), [ROLE.SECRETARY]) ?
    ['', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill', 'Primary Office', 'Secondary Office', 'Assign', 'Remove'] :
    ['', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill', 'Primary Office', 'Secondary Office', 'Remove'];

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
        if (measureData.bill_code === office.code && measureData.bill_number === office.measureNumber) {
          BillInformation.primaryOffice = office.office;
          BillInformation.primaryOfficeId = office._id;
        }
      });
      secondaryOffice.forEach((office) => {
        if (measureData.bill_code === office.code && measureData.bill_number === office.measureNumber) {
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
  useEffect(() => {
    setData(BillData());
  }, [ready, savedBill]);
  console.log(data);
  const [currentTab, setCurrentTab] = useState('Upcoming Bills');
  const handleCurrentTab = (tabName) => {
    setCurrentTab(tabName);
  };
  return (ready ? (
    <Container id={PAGE_IDS.SAVED_BILLS} className="py-3">
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
              <SavedBill billData={data} hearingData={HearingData2} tableHeaders={table_headers} />
            </Tab>
            <Tab eventKey="bills" title="Bills">
              <Col className="text-center">
                <h2>Bills</h2>
              </Col>
              <SavedBill billData={data} hearingData={HearingData2} tableHeaders={table_headers} />
            </Tab>
            <Tab eventKey="dead-bills" title="Dead Bills">
              <Col className="text-center">
                <h2>Dead Bills</h2>
              </Col>
              <SavedBill billData={data} hearingData={HearingData2} tableHeaders={table_headers} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Stuff" />);
};

export default SavedBills;
