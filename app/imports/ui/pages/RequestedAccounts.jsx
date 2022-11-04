import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { RequestedProfiles } from '../../api/user/RequestedAccountsCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import RequestedProfileData from '../components/RequestedProfileData';

/**
 * const user1 = {
  first: 'Sarah',
  last: 'foo',
  email: 'Sarahfoo@aml.com',
};
const user2 = {
  first: 'Jack',
  last: 'foo',
  email: 'Jackfoo@aml.com',
}; */

const RequestedAccounts = () => {
  const { reqAccounts, ready } = useTracker(() => {
    const subscription = RequestedProfiles.subscribeUser();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const reqAcc = RequestedProfiles.find({}).fetch();
    return {
      reqAccounts: reqAcc,
      ready: rdy,
    };
  }, []);
  console.log(ready, reqAccounts);
  return (ready ? (
    <Container id={PAGE_IDS.REQUESTED_ACCOUNTS} className="py-3">
      <h2 className="text-center">Requested Accounts</h2>
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>DOE Users</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Employee ID</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
              </tr>
            </thead>
            <tbody>
              {reqAccounts.map((requestedProfile, index) => <RequestedProfileData key={index} requestedProfile={requestedProfile} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};
export default RequestedAccounts;
