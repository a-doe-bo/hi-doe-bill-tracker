import React, { useState } from 'react';
import { Button, Col, Container, InputGroup, Row, Form, Tabs, Tab, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import AwaitingTestimoniesItem from '../components/AwaitingTestimoniesItem';
import { Measures } from '../../api/measure/MeasureCollection';

const ListTestimonies = () => {
  const { ready, measures } = useTracker(() => {
    const measureSubscription = Measures.subscribeMeasures();
    const rdy = measureSubscription.ready();
    const measuresItems = Measures.find({}, {}).fetch();
    return {
      measures: measuresItems,
      ready: rdy,
    };
  }, []);
  const [searchInput, setSearchInput] = useState('');
  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  const DraftsAwaitingTestimonies = measures.map((measure) => ({
    _id: measure._id,
    bill_name: measure.measureTitle,
    bill_due_date: measure.year,
    bill_id: measure.bill_number,
    office: measure.currentReferral,
    submitted_testimony: false,
  }));
  const SubmittedTestimonies = measures.map((measure) => ({
    _id: measure._id,
    bill_name: measure.measureTitle,
    bill_due_date: measure.year,
    bill_id: measure.bill_number,
    office: measure.currentReferral,
    submitted_testimony: false,
  }));

  return (ready ? (
    <Container id={PAGE_IDS.AWAITING_REVIEWS} className="py-3" style={{ minWidth: '1500px' }}>
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center mb-3">
            <h1>List of Testimonies</h1>
          </Col>
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
            defaultActiveKey="awaiting-testimonies"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="awaiting-testimonies" title="Awaiting Your Testimony">
              <Col className="text-center mb-3">
                <h1>Awaiting Testimonies</h1>
              </Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Bill Name</th>
                    <th>Bill Due Date</th>
                    <th>Office</th>
                    <th>Create Draft</th>
                  </tr>
                </thead>
                <tbody>
                  {DraftsAwaitingTestimonies.map((awaitingTestimonies) => <AwaitingTestimoniesItem awaitingTestimonies={awaitingTestimonies} key={awaitingTestimonies._id} createDraft />)}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="submitted-testimonies" title="Submitted Testimonies">
              <Col className="text-center mb-3">
                <h1>Submitted Testimonies</h1>
              </Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Bill Name</th>
                    <th>Bill Due Date</th>
                    <th>Office</th>
                    <th>View Testimony</th>
                  </tr>
                </thead>
                <tbody>
                  {SubmittedTestimonies.map((awaitingTestimonies) => <AwaitingTestimoniesItem key={awaitingTestimonies._id} awaitingTestimonies={awaitingTestimonies} viewTestimony />)}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Testimonies" />);
};

export default ListTestimonies;
