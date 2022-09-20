import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import UserProfileData from '../components/UserProfileData';

const ListStuffAdmin = () => {
  const { userProfiles, ready } = useTracker(() => {
    const subscription = UserProfiles.subscribeUser();
    const rdy = subscription.ready();
    const user = UserProfiles.find({}).fetch();
    return {
      userProfiles: user,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.LIST_STUFF_ADMIN} className="py-3">
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
              {userProfiles.map((userProfile, index) => <UserProfileData key={index} userProfile={userProfile} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStuffAdmin;
