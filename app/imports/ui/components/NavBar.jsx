import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const menuStyle = { marginBottom: '10px' };
  return (
    <Navbar bg="light" expand="lg" style={menuStyle}>
      <Container>
        <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/">
          <Image src="/images/logo-720x720.png" width="5%" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_BILLS} as={NavLink} to="/list" key="list">View Bills</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_SAVED_BILLS} as={NavLink} to="/savedBills" key="savedBills">Saved Bills</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/admin" key="admin">Manage User Accounts</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/createAccount" key="create-account">Create Accounts For Users</Nav.Link>,
                <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage" key="manage-dropdown">
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} to="/manage-database"><CloudDownload /> Database</NavDropdown.Item>
                </NavDropdown>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE_APPROVER]) || Roles.userIsInRole(Meteor.userId(), [ROLE.PIPE_APPROVER]) || Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/listAwaitingReviews" key="awaitingReviewOfficeApprover">Manage Reviews</Nav.Link>]
            ) : ''}
<<<<<<< HEAD
            {Roles.userIsInRole(Meteor.userId(), [ROLE.PIPE_APPROVER]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/listAwaitingReviews" key="awaitingReviewPIPEApprover">Awaiting Reviews</Nav.Link>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/listAwaitingReviews" key="awaitingReviewFinalApprover">Awaiting Reviews</Nav.Link>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.WRITER]) ? (
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_BILLS} as={NavLink} to="/awaitingtestimonies" key="awaitingWriterTestimony">Awaiting Testimony</Nav.Link>
            ) : ''}
=======
>>>>>>> main
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin">Login</Nav.Link>
            ) : (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout"><BoxArrowRight /> Sign out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
