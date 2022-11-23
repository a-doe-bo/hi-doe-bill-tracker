import React, { useState } from 'react';
import { Button, Col, Container, InputGroup, Row, Form, Tabs, Tab, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import AwaitingReviewsItem from '../components/AwaitingReviewsItem';
import { ApproverFlows } from '../../api/approverflow/approverflow';
import { Measures } from '../../api/measure/MeasureCollection';

const ListAwaitingReviews = () => {
  const { ready, approverFlow, measure } = useTracker(() => {
    const subscription = ApproverFlows.subscribeApproverFlow();
    const measureSubscription = Measures.subscribeMeasures();
    const rdy = subscription.ready() && measureSubscription.ready();
    const ApproverFlowsItems = ApproverFlows.find({}, {}).fetch();
    const measureItems = Measures.find({}, {}).fetch();
    const mapWithValues = ApproverFlowsItems.map((d) => d.billNumber);
    const filterMeasureItem = measureItems.filter((d) => (mapWithValues.includes(d.measureNumber)));
    return {
      approverFlow: ApproverFlowsItems,
      measure: filterMeasureItem,
      ready: rdy,
    };
  }, []);
  const [searchInput, setSearchInput] = useState('');
  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  console.log('This is the approver flow', approverFlow);
  console.log('This is the measure', measure);
  const DraftsAwaitingReviews = approverFlow.map((stuff, index) => ({
    _id: stuff._id,
    bill_name: `Bill ${index}`,
    bill_number: index,
    // TODO: this should be a MongoDB id for the Bill collection
    bill_id: '12123123123',
    office: 'OCF',
    drafter_name: 'Hugh Janas',
    drafter_submitted_date: new Date().toLocaleDateString(),
    // TODO: this should be a MongoDB id for the Comments collection
    commentsOnBill: '12123123123',
    submitted_review: false,
  }));
  const SubmittedReviews = approverFlow.map((stuff, index) => ({
    _id: stuff._id,
    bill_name: `Bill ${index}`,
    bill_number: index,
    // TODO: this should be a MongoDB id for the Bill collection
    bill_id: '12123123123',
    office: 'OCF',
    drafter_name: 'Hugh Janas',
    drafter_submitted_date: new Date().toLocaleDateString(),
    // TODO: this should be a MongoDB id for the Comments collection
    comments_on_bill: '12123123123',
    submitted_review: false,
  }));
  return (ready ? (
    <Container id={PAGE_IDS.AWAITING_REVIEWS} className="py-3" style={{ minWidth: '1500px' }}>
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center mb-3">
            <h1>List of Reviews</h1>
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
            <Tab eventKey="awaiting-reviews" title="Awaiting Your Review">
              <Col className="text-center mb-3">
                <h1>Awaiting Your Review</h1>
              </Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Drafter Name</th>
                    <th>Submitted Draft Date</th>
                    <th>Bill Name</th>
                    <th>Bill Number</th>
                    <th>Office</th>
                    <th>View Bill</th>
                    <th>Create Comment On Testimony</th>
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <th />
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {DraftsAwaitingReviews.map((awaitingReviews) => <AwaitingReviewsItem key={awaitingReviews._id} awaitingReviews={awaitingReviews} createComment accept reject />)}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="reviews-awaiting-response" title="Reviews Submitted With Comments">
              <Col className="text-center mb-3">
                <h1>Review submitted comments</h1>
              </Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Drafter Name</th>
                    <th>Submitted Draft Date</th>
                    <th>Bill Name</th>
                    <th>Bill Number</th>
                    <th>Office</th>
                    <th>View Bill</th>
                    <th>Edit Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {SubmittedReviews.map((awaitingReviews) => <AwaitingReviewsItem key={awaitingReviews._id} awaitingReviews={awaitingReviews} editComment />)}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="awaiting-response" title="Approved Testimonies">
              <Col className="text-center mb-3">
                <h1>Approved Testimonies</h1>
              </Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Drafter Name</th>
                    <th>Submitted Draft Date</th>
                    <th>Bill Name</th>
                    <th>Bill Number</th>
                    <th>Office</th>
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
