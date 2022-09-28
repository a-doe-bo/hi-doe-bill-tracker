import React, { useState, useEffect } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormCheck from './FormCheck';

const DAY_IN_MILISECONDS = 1000 * 3600 * 24;

const BillFilter = ({ handleDataFiltering, data, tab }) => {
  const statusOptions = ['Writing', 'Office Approver', 'PIPE Approver', 'Final Approver', 'Pending Process', 'Processed', 'Status_1'];
  const officeOptions = ['office1', 'office2', 'office3', 'office4', 'office5'];
  const houseCommittees =
      ['Agriculture', 'Culture, Arts & International Affairs',
        'Corrections, Military, & Veterans', 'Consumer Protection & Commerce', 'Economic Development', 'Education',
        'Energy & Environmental Protection', 'Finance', 'Government Reform', 'Higher Education & Technology',
        'Health, Human Services, & Homelessness', 'Housing', 'Judiciary & Hawaiian Affairs', 'Labor & Tourism',
        'Legislative Management', 'Pandemic & Disaster Preparedness', 'Transportation', 'Water & Land'];
  const senateCommittees =
      ['Agriculture & Environment', 'Commerce & Consumer Protection',
        'Education', 'Energy, Economic Development, and Tourism',
        'Government Operations', 'Human Services', 'Housing', 'Higher Education',
        'Health', 'Hawaiian Affairs', 'Judiciary', 'Labor, Culture and the Arts', 'Public Safety, Intergovernmental, and Military Affairs',
        'Transportation', 'Ways and Means', 'Water And Land'];
  const measureTypes = ['HB', 'SB', 'HR', 'SR', 'HCR', 'SCR', 'GM'];
  const date = ['Last 7 days', 'Last 30 days', 'Last 60 days', 'Last 90 days', 'Last 120 days'];
  const [statusCheckedState, setStatusCheckedState] = useState([]);
  const [officeCheckedState, setOfficeCheckedState] = useState([]);
  const [houseCommitteeState, setHouseCommitteeState] = useState([]);
  const [senateCommitteeState, setSenateCommitteeState] = useState([]);
  const [measureTypesState, setMeasureTypes] = useState([]);
  const [dateState, setDateState] = useState([]);
  const [ogData, setOgData] = useState([]);

  // Set our original data on page load
  useEffect(() => {
    setOgData(data);
  }, []);

  const highestDateInArray = () => {
    const days = dateState.map((str) => (str.match(/\d+/)));
    return Math.max(...days);
  };

  const billDateUpdatedFromToday = (billData) => {
    const todayInMs = new Date().getTime();
    const differenceInTime = todayInMs - billData;
    return differenceInTime / DAY_IN_MILISECONDS;
  };
  const filterData = () => {
    let filteredData = ogData;
    let filteredOffice = [];
    let filteredStatus = [];
    let filterCommittee = [];
    let filteredMeasureType = [];
    let filteredDateState = [];
    const dataCopy = ogData;

    if (statusCheckedState.length > 0 || officeCheckedState.length > 0 || houseCommitteeState.length > 0 || senateCommitteeState.length > 0 || measureTypesState.length > 0 || dateState.length > 0) {
      filteredStatus = dataCopy.filter((d) => (statusCheckedState.includes(d.bill_status)));
      filteredOffice = dataCopy.filter((d) => (officeCheckedState.includes(d.office)));
      filterCommittee = dataCopy.filter((d) => (houseCommitteeState.includes(d.bill_committee) || senateCommitteeState.includes(d.bill_committee)));
      filteredMeasureType = dataCopy.filter((d) => (measureTypesState.includes(d.measureType)));
      // Date difference
      filteredDateState = dataCopy.filter((d) => {
        const billSinceIntroduced = billDateUpdatedFromToday(d.bill_updated);
        const highestDateSelected = highestDateInArray();
        return highestDateSelected >= billSinceIntroduced;
      });
      filteredData = [...new Set([...filteredStatus, ...filteredOffice, ...filterCommittee, ...filteredMeasureType, ...filteredDateState])];
    }

    switch (tab) {
    case 'Bills':
      handleDataFiltering(() => ([...filteredData]));
      break;
    case 'Upcoming Bills':
      handleDataFiltering(() => ([...filteredData]));
      break;
    case 'Dead Bills':
      handleDataFiltering(() => ([...filteredData]));
      break;
    default:
      handleDataFiltering(() => ([...ogData]));
      break;
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>Filter</Card.Header>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Status</Accordion.Header>
          <Accordion.Body>
            <FormCheck
              options={statusOptions}
              handleCheckedState={setStatusCheckedState}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Office</Accordion.Header>
          <Accordion.Body>
            <FormCheck
              options={officeOptions}
              handleCheckedState={setOfficeCheckedState}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Measure Type</Accordion.Header>
          <Accordion.Body>
            <FormCheck
              options={measureTypes}
              handleCheckedState={setMeasureTypes}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>House Committees</Accordion.Header>
          <Accordion.Body>
            <FormCheck
              options={houseCommittees}
              handleCheckedState={setHouseCommitteeState}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Senate Committees</Accordion.Header>
          <Accordion.Body>
            <FormCheck
              options={senateCommittees}
              handleCheckedState={setSenateCommitteeState}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>Bill Updated</Accordion.Header>
          <Accordion.Body>
            <FormCheck
              options={date}
              handleCheckedState={setDateState}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button onClick={() => (filterData())}>Filter</Button>
    </Card>
  );
};

BillFilter.propTypes = {
  handleDataFiltering: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.string,
    bill_status: PropTypes.string,
    bill_hearing: PropTypes.string,
    bill_number: PropTypes.number,
    bill_updated: PropTypes.number,
    bill_committee: PropTypes.string,
    measureTypes: PropTypes.string,
    office: PropTypes.string,
  })).isRequired,
};

export default BillFilter;