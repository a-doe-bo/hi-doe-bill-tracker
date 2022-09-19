import React, { useState } from 'react';
import { Button, Col, Container, InputGroup, Row, Form, Tabs, Tab, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../api/stuff/StuffCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import AwaitingTestimoniesItem from '../components/AwaitingTestimoniesItem';

const ListTestimonies = () => {
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
  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  const DraftsAwaitingTestimonies = stuffs.map((stuff, index) => ({
    _id: stuff._id,
    bill_name: `Bill ${index}`,
    bill_due_date: new Date().toLocaleDateString(),
    // TODO: this should be a MongoDB id for the Bill collection
    bill_id: '123456',
    office: 'OCF',
    submitted_testimony: false,
  }));
  const SubmittedTestimonies = stuffs.map((stuff, index) => ({
    _id: stuff._id,
    bill_name: `Bill ${index}`,
    bill_due_date: new Date().toLocaleDateString(),
    // TODO: this should be a MongoDB id for the Bill collection
    bill_id: '123456',
    office: 'OCF',
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
                    <th>View Bill</th>
                    <th>Create Draft</th>
                  </tr>
                </thead>
                <tbody>
                {DraftsAwaitingTestimonies.map((awaitingTestimonies) => <AwaitingTestimoniesItem awaitingTestimonies={awaitingTestimonies} key={awaitingTestimonies._id} createDraft /> )}
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
                    <th>View Bill</th>
                    <th>Create Draft</th>
                  </tr>
                </thead>
                <tbody>
                  {SubmittedTestimonies.map((awaitingTestimonies) => <AwaitingTestimoniesItem key={awaitingTestimonies._id} awaitingTestimonies={awaitingTestimonies} createDraft />)}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Stuff" />);
};

export default ListTestimonies;
