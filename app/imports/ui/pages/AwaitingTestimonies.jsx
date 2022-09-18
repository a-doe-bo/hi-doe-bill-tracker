import React, { useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row, Tab, Table, Tabs } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Measures } from '../../api/measure/MeasureCollection';
import { Stuffs } from '../../api/stuff/StuffCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import AwaitingReviewsItem from '../components/AwaitingReviewsItem';

const AwaitingTestimonies = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stuffs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    const subscription = Stuffs.subscribeStuff(); // TODO: will be changed to Measures when more data is available
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Stuffs.find({}, { sort: { name: 1 } }).fetch(); // TODO: will be changed to Measures when more data is available
    return {
      stuffs: stuffItems, // TODO: rename to measures when data is ready
      ready: rdy,
    };
  }, []);
  const [searchInput, setSearchInput] = useState('');
  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const theDraftTestimonies = stuffs.map((bill, index) => ({
    _id: bill._id,
    billName: `Bill ${index}`,
    billDueDate: new Date().toLocaleDateString(),
    submitted_testimony: false,
  }));
    return ( ready ? (
      <Container className="py-3">
        <Row className='justify-content-center'>
          <Col md={7}>
            <Col className="text-center mb-3">
              <h1 className="text-center mb-3">Testimonies</h1>
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
              defaultActiveKey='awaiting-testimonies'
              id='uncontrolled-tab-example'
              className='mb-3'
            >
              <Tab eventKey="awaiting-testimonies" title="Awaiting Testimonies">
                <Col>
                  <h3>Awaiting Bill Testimonies</h3>
                </Col>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Bill Name</th>
                      <th>Bill Testimony Date</th>
                      <th>View Bill</th>
                      <th>Create Draft</th>
                      <th>Upload Draft</th>
                    </tr>
                  </thead>
                  <tbody>
                    {theDraftTestimonies.map(awaitingTestimonies => <AwaitingTestimoniesItem key={awaitingTestimonies._id})}
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
            </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner message="Loading testimonies" />);
};

export default AwaitingTestimonies