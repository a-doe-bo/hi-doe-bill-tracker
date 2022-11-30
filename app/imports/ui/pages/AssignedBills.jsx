import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
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
import { Measures } from '../../api/measure/MeasureCollection';
import SavedBill from '../components/SavedBill';

const AssignedBills = () => {
  const { ready, experts, hearings, primaryOffice, secondaryOffice, measure } = useTracker(() => {
    const owner = Meteor.user() ? Meteor.user().username : '';
    const hearingBillsSubscription = Hearings.subscribeHearings();
    const measureSubscription = Measures.subscribeMeasures();
    const expertSubscription = Experts.subscribeToExpert();
    const primaryOfficeSubscription = PrimaryOffice.subscribePrimaryOffice();
    const secondaryOfficeSubscription = SecondaryOffice.subscribeSecondaryOffice();
    const rdy = measureSubscription.ready() && hearingBillsSubscription.ready() && expertSubscription.ready() && primaryOfficeSubscription.ready() && secondaryOfficeSubscription.ready();
    const hearingItems = Hearings.find({}, {}).fetch();
    const expertItems = Experts.find({ secretary: owner }, {}).fetch();
    const measureItems = Measures.find({}, {}).fetch();
    const returnData = [];
    measureItems.forEach((item) => {
      expertItems.forEach((expert) => {
        const measureData = {
          measureNumber: item.measureNumber,
          measureTitle: item.measureTitle,
          status: item.status,
        };
        const expertMeasureData = {
          measureNumber: expert.bill_number,
          measureTitle: expert.bill_name,
          status: expert.bill_status,
        };
        if (_.isEqual(measureData, expertMeasureData)) {
          returnData.push(item);
        }
      });
    });
    const primaryOfficeItems = PrimaryOffice.find({}, {}).fetch();
    const secondaryOfficeItems = SecondaryOffice.find({}, {}).fetch();
    return {
      hearings: hearingItems,
      experts: expertItems,
      primaryOffice: primaryOfficeItems,
      secondaryOffice: secondaryOfficeItems,
      measure: returnData,
      ready: rdy,
    };
  }, []);

  const [currentTab, setCurrentTab] = useState('Assigned Bills');
  const table_headers = ['', 'Bill Number', 'Bill Name', 'Bill Status', 'Hearing Date', 'View Bill', 'Primary Office', 'Secondary Office', 'Assigned To'];
  const BillData = () => {
    let BillInformation = {};
    const returnArr = [];
    measure.forEach((measureData) => {
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
      BillInformation.bill_name = measureData.measureTitle;
      BillInformation.bill_status = measureData.status;
      BillInformation.bill_hearing = measureData.year;
      BillInformation.bill_number = measureData.measureNumber;
      BillInformation.bill_updated = measureData.lastUpdated;
      BillInformation.bill_committee = measureData.committeeHearing;
      BillInformation.bill_code = measureData.code;
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
  const expertRecipients = experts.map((expert) => (expert.recipient));
  const [data, setData] = useState([]);
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
                <SavedBill assignedTo={expertRecipients} billData={data} hearingData={HearingData2} tableHeaders={table_headers} assignExpert={false} trash={false} />
              </Tab>
            ))}
          </Tabs>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Measures" />);
};
export default AssignedBills;
