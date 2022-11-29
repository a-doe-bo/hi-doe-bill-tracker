import React, { useState, useEffect } from 'react';
import { Button, Col, Container, InputGroup, Row, Form, Tabs, Tab, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import AwaitingReviewsItem from '../components/AwaitingReviewsItem';
import { ApproverFlows } from '../../api/approverflow/approverflow';
import { Measures } from '../../api/measure/MeasureCollection';
import { ROLE } from '../../api/role/Role';

const ListAwaitingReviews = () => {
  const { ready, approverFlow, measure } = useTracker(() => {
    const subscription = ApproverFlows.subscribeApproverFlow();
    const measureSubscription = Measures.subscribeMeasures();
    const rdy = subscription.ready() && measureSubscription.ready();
    const ApproverFlowsItems = ApproverFlows.find({}, {}).fetch();
    const measureItems = Measures.find({}, {}).fetch();
    const mapWithValues = ApproverFlowsItems.map((d) => ({ billNumber: d.billNumber, billStatus: d.billStatus }));
    const filterMeasureData = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const T of measureItems) {
      const s = {};
      s.billNumber = T.measureNumber;
      s.billStatus = T.status;
      // eslint-disable-next-line no-restricted-syntax
      for (const m of mapWithValues) {
        if (_.isEqual(s, m)) {
          filterMeasureData.push(T);
        }
      }
    }
    return {
      approverFlow: ApproverFlowsItems,
      measure: filterMeasureData,
      ready: rdy,
    };
  }, []);
  const [searchInput, setSearchInput] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [awaitingReviews, setAwaitingReviews] = useState([]);
  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  useEffect(() => {
    let filteredSubmittedReviews = [];
    let filteredAwaitingReviews = [];
    if (Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE_APPROVER])) {
      filteredSubmittedReviews = approverFlow.filter((bill) => bill.officeApproved === true);
      filteredAwaitingReviews = approverFlow.filter((bill) => (bill.officeApproved == null && bill.writerSubmission === true));
      setSubmittedReviews(filteredSubmittedReviews);
      setAwaitingReviews(filteredAwaitingReviews);
    }
    if (Roles.userIsInRole(Meteor.userId(), [ROLE.PIPE_APPROVER])) {
      filteredSubmittedReviews = approverFlow.filter((bill) => bill.pipeApproved === true);
      filteredAwaitingReviews = approverFlow.filter((bill) => ((bill.pipeApproved == null && bill.officeApproved && bill.writerSubmission === true)));
      setSubmittedReviews(filteredSubmittedReviews);
      setAwaitingReviews(filteredAwaitingReviews);
    }
    if (Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER])) {
      filteredSubmittedReviews = approverFlow.filter((bill) => bill.finalApproved === true);
      filteredAwaitingReviews = approverFlow.filter((bill) => ((bill.finalApproved == null && bill.officeApproved && bill.pipeApproved && bill.writerSubmission === true)));
      setSubmittedReviews(filteredSubmittedReviews);
      setAwaitingReviews(filteredAwaitingReviews);
    }
  }, [approverFlow, measure, ready]);

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
                    <th>View Bill</th>
                    <th>Create Comment On Testimony</th>
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <th />
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {awaitingReviews.map((r) => <AwaitingReviewsItem key={r._id} measureData={measure} awaitingReviews={r} createComment accept reject download />)}
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
                    <th>View Bill</th>
                    <th>Edit Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedReviews.map((r) => <AwaitingReviewsItem key={r._id} measureData={measure} awaitingReviews={r} editComment />)}
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
