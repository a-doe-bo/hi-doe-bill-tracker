import React, { useState } from 'react';
import { Button, Col, Container, InputGroup, Row, Form, Tabs, Tab, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../api/stuff/StuffCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import StuffItem from '../components/StuffItem';
import AwaitingReviewsItem from "../components/AwaitingReviewsItem";

/* Renders a table containing all of the Stuff documents. Use <BillItem> to render each row. */
const ListAwaitingReviews = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stuffs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Stuffs.subscribeStuff();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
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
  const DraftsAwaitingReviews = stuffs.map((stuff, index) => ({
    _id: stuff._id,
    bill_name: `Bill ${index}`,
    bill_number: index,
    // TODO: this should be a MongoDB id for the Bill collection
    bill_id: '12123123123',
    drafter_name: 'Hugh Janas',
    drafter_submitted_date: new Date().toLocaleDateString(),
    // TODO: this should be a MongoDB id for the Comments collection
    commentsOnBill: '12123123123',
    submitted_review: false,
  }));
  const SubmittedReviews = stuffs.map((stuff, index) => ({
    _id: stuff._id,
    bill_name: `Bill ${index}`,
    bill_number: index,
    // TODO: this should be a MongoDB id for the Bill collection
    bill_id: '12123123123',
    drafter_name: 'Hugh Janas',
    drafter_submitted_date: new Date().toLocaleDateString(),
    // TODO: this should be a MongoDB id for the Comments collection
    comments_on_bill: '12123123123',
    submitted_review: false,
  }));
  return (ready ? (
    <Container id={PAGE_IDS.AWAITING_REVIEWS} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center mb-3">
            <h1 className="text-center mb-3">List of Reviews</h1>
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
            defaultActiveKey="awaiting-reviews"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="awaiting-reviews" title="Awaiting Reviews">
              <Col>
                <h2>Bills Awaiting Your Review</h2>
              </Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Drafter Name</th>
                    <th>Submitted Draft Date</th>
                    <th>Bill Name</th>
                    <th>Bill Number</th>
                    <th>View Bill</th>
                    <th>Create Comment On Testimony</th>
                  </tr>
                </thead>
                <tbody>
                  {DraftsAwaitingReviews.map((awaitingReviews) => <AwaitingReviewsItem key={awaitingReviews._id} awaitingReviews={awaitingReviews} createComment />)}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="awaiting-response" title="Submitted Reviews">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Drafter Name</th>
                    <th>Submitted Draft Date</th>
                    <th>Bill Name</th>
                    <th>Bill Number</th>
                    <th>View Bill</th>
                    <th>Edit Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {SubmittedReviews.map((awaitingReviews) => <AwaitingReviewsItem key={awaitingReviews._id} awaitingReviews={awaitingReviews} editComment />)}
                </tbody>
              </Table>
            </Tab>
          </Tabs>

        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Stuff" />);
};

export default ListAwaitingReviews;
