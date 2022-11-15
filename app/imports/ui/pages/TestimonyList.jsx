import React from 'react';
import { Container, Col, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Testimonies } from '../../api/testimony/TestimonyCollection';
import TestimonyItem from '../components/TestimonyItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

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
    <Container id={PAGE_IDS.TESTIMONY_LIST} className="py-3">
      <Row className="justify-content-center" style={style}>
        <Col md={7} style={style}>
          <Table striped bordered hover style={style}>
            <thead>
              <tr>
                <th>Bill No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Position</th>
                <th>Testimony</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {testimonies.map((testimony) => (<TestimonyItem key={testimony.id} testimony={testimony} />))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Testimony" />;
};

export default TestimonyList;
