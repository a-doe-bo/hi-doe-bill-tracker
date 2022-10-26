import React from 'react';
import { Container, Col, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import TestimonyItem from '../components/TestimonyItem';
import { Testimonies } from '../../api/testimony/TestimonyCollection';

const TestimonyList = () => {
  const { ready, testimonies } = useTracker(() => {
    const subscription = Testimonies.subscribeTestimony();
    const rdy = subscription.ready();
    const testimonyItems = Testimonies.find({}, { sort: { lastName: 1 } }).fetch();
    return {
      testimonies: testimonyItems,
      ready: rdy,
    };
  }, []);

  const style = { width: '100%', margin: 0 };

  return ready ? (
    <Container id={PAGE_IDS.LIST_TESTIMONY} className="py-3">
      <Row className="justify-content-center" style={style}>
        <Col md={7} style={style}>
          <Table striped bordered hover style={style}>
            <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Testimony</th>
              <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            {testimonies.map((testimony) => (<TestimonyItem key={testimony.id} testimony={testimony} />))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Testimonies" />;
};

export default TestimonyList;