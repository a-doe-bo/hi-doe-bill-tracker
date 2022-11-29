import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import _ from 'underscore';
import FormCheck from './FormCheck';
import { Filters } from '../../api/filter/FilterCollection';
import { defineMethod, updateMethod } from '../../api/base/BaseCollection.methods';

const DAY_IN_MILISECONDS = 1000 * 3600 * 24;

const BillFilter = ({ handleDataFiltering, data, tab }) => {
  const { filterOptions, ready } = useTracker(() => {
    const owner = Meteor.user().username;
    const subscription = Filters.subscribeFilter();
    const rdy = subscription.ready();
    const filterOptionsItems = Filters.find({ owner }, {}).fetch();
    return {
      filterOptions: filterOptionsItems[0],
      ready: rdy,
    };
  });
  const statusOptions = ['Writing', 'Office Approver', 'PIPE Approver', 'Final Approver', 'Pending Process', 'Processed', 'Status_1'];
  const officeOptions = ['Deputy', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'];
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
  const measureTypes = ['hb', 'sb', 'hr', 'sr', 'hcr', 'scr', 'gm'];
  const date = ['Last 7 days', 'Last 30 days', 'Last 60 days', 'Last 90 days', 'Last 120 days'];
  const [statusCheckedState, setStatusCheckedState] = useState([]);
  const [officeCheckedState, setOfficeCheckedState] = useState([]);
  const [houseCommitteeState, setHouseCommitteeState] = useState([]);
  const [senateCommitteeState, setSenateCommitteeState] = useState([]);
  const [measureTypesState, setMeasureTypes] = useState([]);
  const [dateState, setDateState] = useState([]);
  const [ogData, setOgData] = useState([]);

  const highestDateInArray = () => {
    const days = dateState.map((str) => (str.match(/\d+/)));
    return Math.max(...days);
  };

  const billDateUpdatedFromToday = (billData) => {
    const todayInMs = new Date().getTime();
    const differenceInTime = todayInMs - billData;
    return differenceInTime / DAY_IN_MILISECONDS;
  };
  const dataFilter = () => {
    const officeCheckedStateData = officeCheckedState.map((officeChecked) => ({ label: officeChecked, value: officeChecked }));
    const returnMeasures = [];
    ogData.forEach((measureInfo) => {
      measureInfo.primaryOffice.forEach((obj) => {
        officeCheckedStateData.forEach((office) => {
          if (_.isEqual(obj, office)) {
            returnMeasures.push(measureInfo);
          }
        });
      });
    });
    return returnMeasures;
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
      filteredOffice = dataFilter();
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

  // Set our original data on page load
  useEffect(() => {
    setOgData(data);
    if (filterOptions) {
      // eslint-disable-next-line no-shadow
      const { statusOptions, officeOptions, measureTypeOptions, dateStateOptions } = filterOptions;
      if (statusOptions.length > 0 ||
            officeOptions.length > 0 ||
            measureTypeOptions.length > 0 ||
            dateStateOptions.length > 0
      ) {
        setStatusCheckedState(statusOptions);
        setOfficeCheckedState(prevState => [...prevState, ...officeOptions]);
        setMeasureTypes(measureTypeOptions);
        setDateState(dateStateOptions);
        filterData();
      }
    }
    return () => {};
  }, [ready]);

  const submit = () => {
    const owner = Meteor.user().username;
    const collectionName = Filters.getCollectionName();
    const savedFilterSettings = {
      statusOptions: statusCheckedState,
      officeOptions: officeCheckedState,
      measureTypeOptions: measureTypesState,
      dateStateOptions: dateState,
      owner,
    };
    // Update the filter collection
    if (filterOptions) {
      savedFilterSettings.id = filterOptions._id;
      const updateData = savedFilterSettings;
      updateMethod.callPromise(({ collectionName, updateData }))
        .catch((e) => swal('Error', e.message, 'error'))
        .then(() => swal('Success', 'Item updated Successfully', 'success'));
    } else {
      const definitionData = savedFilterSettings;
      defineMethod.callPromise({ collectionName, definitionData })
        .catch((e) => swal('Error', e.message, 'error'))
        .then(() => {
          swal('Success', 'Item Added Successfully', 'success');
        });
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
              data={statusCheckedState}
              handleCheckedState={setStatusCheckedState}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Office</Accordion.Header>
          <Accordion.Body>
            <FormCheck
              data={officeCheckedState}
              options={officeOptions}
              handleCheckedState={setOfficeCheckedState}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Measure Type</Accordion.Header>
          <Accordion.Body>
            <FormCheck
              data={measureTypesState}
              options={measureTypes}
              handleCheckedState={setMeasureTypes}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>House Committees</Accordion.Header>
          <Accordion.Body>
            <FormCheck
              data={houseCommitteeState}
              options={houseCommittees}
              handleCheckedState={setHouseCommitteeState}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Senate Committees</Accordion.Header>
          <Accordion.Body>
            <FormCheck
              data={senateCommitteeState}
              options={senateCommittees}
              handleCheckedState={setSenateCommitteeState}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>Bill Updated</Accordion.Header>
          <Accordion.Body>
            <FormCheck
              data={dateState}
              options={date}
              handleCheckedState={setDateState}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button onClick={() => (filterData())} className="mt-2">Filter</Button>
      <Button onClick={() => (submit())} className="mt-2">Save Filters</Button>
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
    bill_hearing: PropTypes.number,
    bill_number: PropTypes.number,
    bill_code: PropTypes.string,
    bill_updated: PropTypes.number,
    bill_committee: PropTypes.string,
    measureType: PropTypes.string,
    primaryOffice: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    primaryOfficeId: PropTypes.string,
    secondaryOffice: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    secondaryOfficeId: PropTypes.string,
  })).isRequired,
};

export default BillFilter;
