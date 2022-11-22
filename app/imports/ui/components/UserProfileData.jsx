import React from 'react';
import '/client/style.css';
import { Card, Row, Col } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from './LoadingSpinner';
import { UserProfiles } from '../../api/user/UserProfileCollection';

const UserProfileData = ({ user, ready }) => ((ready) ? (
  <Card>
    <Card.Body>
      <Row>
        <Col md="5" className="align-middle text-center">
          <Card.Img
            src={user.img}
            className="rounded-circle img-fluid img-thumbnail"
            style={{ width: '12rem' }}
          />
        </Col>
        <Col md="7">
          <Card.Text className="user-profile-main-card">
            <dl className="row">
              <dt className="col-sm-auto">First Name:</dt>
              <dd className="col-sm-7">{user.firstName}</dd>

              <dt className="col-sm-auto">last Name:</dt>
              <dd className="col-sm-7">{user.lastName}</dd>

              <dt className="col-sm-auto">Email:</dt>
              <dd className="col-sm-7">{user.email}</dd>

              <dt className="col-sm-auto">Phone:</dt>
              <dd className="col-sm-7">{user.phone}</dd>

              <dt className="col-sm-auto">Office:</dt>
              <dd className="col-sm-8">{user.office}</dd>

              <dt className="col-sm-auto">Role:</dt>
              <dd className="col-sm-7">{user.role}</dd>
            </dl>
          </Card.Text>
        </Col>
      </Row>
    </Card.Body>
  </Card>

) : <LoadingSpinner />);

UserProfileData.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  user: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const userID = Meteor.user() ? Meteor.user()._id : ' ';
  const subscription = UserProfiles.subscribe();
  const ready = subscription.ready();
  const user = ready ? UserProfiles.findDoc({ userID }) : undefined;
  return {
    user,
    ready,
  };
})(UserProfileData);
