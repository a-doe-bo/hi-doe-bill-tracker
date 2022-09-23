import React, { useState } from 'react';
import { Accordion, Button, Card, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormCheck from './FormCheck';

const BillFilter = ({ handleDataFiltering, data, tab }) => {
  const statusOptions = ['Writing', 'Office Approver', 'PIPE Approver', 'Final Approver', 'Pending Process', 'Processed'];
  const officeOptions = ['office1', 'office2', 'office3', 'office4', 'office5'];
  const [statusCheckedState, setStatusCheckedState] = useState([]);
  const [officeCheckedState, setOfficeCheckedState] = useState([]);
  const [startDateIntroduced, setStartDateIntroduced] = useState('');
  const [endDateIntroduced, setEndDateIntroduced] = useState('');
  const [hearingDate, setHearingDate] = useState('');

  const handleDateChange = (e) => {
    const { value, name } = e.target;
    if (name === 'start_date') {
      setStartDateIntroduced(value);
    } else if (name === 'end_date') {
      setEndDateIntroduced(value);
    } else {
      setHearingDate(value);
    }
  };

  const filterData = () => {
    let filteredData = [];
    const dataCopy = data;
    // Check the filter fields
    // Filter the data based on the requirements
    // Check the tab and add the handle
    // if it's not there just return the og data.
    switch (tab) {
    case 'Bills':
      // Filter the data based on the selected filter options
      filteredData = dataCopy.filter((billDetails) => (billDetails === 2));
      handleDataFiltering(() => ([...filteredData]));
      break;
    case 'Upcoming Bills':
      // Filter the data based on the selected filter options
      filteredData = dataCopy.filter((billDetails) => (billDetails !== 2));
      handleDataFiltering(() => ([...filteredData]));
      break;
    case 'Dead Bills':
      // Filter the data based on the selected filter options
      filteredData = dataCopy.filter((billDetails) => (billDetails !== 2));
      handleDataFiltering(() => ([...filteredData]));
      break;
    default:
      handleDataFiltering(() => ([...data]));
      break;
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>Filter</Card.Header>
      <Accordion alwaysOpen defaultActiveKey={['0', '1', '2', '3']}>
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
          <Accordion.Header>Date</Accordion.Header>
          <Accordion.Body>
            <Form>
              Bills Introduced from
              <Form.Control type="date" name="start_date" value={startDateIntroduced} onChange={handleDateChange} />
              to
              <Form.Control type="date" name="end_date" value={endDateIntroduced} onChange={handleDateChange} />
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Hearing Dates</Accordion.Header>
          <Accordion.Body>
            <Form>
              Hearing Dates
              <Form.Control type="date" name="hearing_date" value={hearingDate} onChange={handleDateChange} />
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Card>
        <Button onClick={() => (filterData())}>Filter</Button>
      </Card>
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
  })).isRequired,
};

export default BillFilter;
