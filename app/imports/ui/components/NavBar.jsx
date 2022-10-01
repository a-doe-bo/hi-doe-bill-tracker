import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { CloudDownload, Person, PersonPlus, PersonCheck, BoxArrowRight } from 'react-bootstrap-icons';
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
              <Nav.Link id={COMPONENT_IDS.NAVBAR_SAVED_BILLS} as={NavLink} to="/saved-bills" key="saved">Saved Bills</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
              [
                <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage" key="manage-dropdown">
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} to="/manage-database"><CloudDownload /> Database</NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_ACCOUNTS} key="manage-accounts" as={NavLink} to="/admin"><Person /> User Accounts</NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_CREATE_ACCOUNT} key="manage-create-account" as={NavLink} to="/createAccount"><PersonPlus /> Create User Account</NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_REQUESTED_ACCOUNTS} key="manage-requested-accounts" as={NavLink} to="/requestedAccounts"><PersonCheck /> Requested Accounts</NavDropdown.Item>
                </NavDropdown>,
              ]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE_APPROVER]) || Roles.userIsInRole(Meteor.userId(), [ROLE.PIPE_APPROVER]) || Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_AWAITING_REVIEWS} as={NavLink} to="/listAwaitingReviews" key="awaitingReviewOfficeApprover">Manage Reviews</Nav.Link>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.PIPE_APPROVER]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_AWAITING_REVIEWS} as={NavLink} to="/listAwaitingReviews" key="awaitingReviewPIPEApprover">Awaiting Reviews</Nav.Link>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.FINAL_APPROVER]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_AWAITING_REVIEWS} as={NavLink} to="/listAwaitingReviews" key="awaitingReviewFinalApprover">Awaiting Reviews</Nav.Link>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.WRITER]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_TESTIMONIES} as={NavLink} to="/listTestimonies" key="listWriterTestimonies">Testimonies</Nav.Link>],
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_DRAFT_TESTIMONY} as={NavLink} to="/draftTestimony" key="draftWriterTestimonies">Draft Testimony</Nav.Link>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.SECRETARY]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_REQUEST_NEW_ACCOUNT} as={NavLink} to="/requestNewAccount" key="requestNewAccount">Request New Account</Nav.Link>]
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin">Login</Nav.Link>
            ) : (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_USER_PAGE} as={NavLink} to="/userPage"><BoxArrowRight /> Profile</NavDropdown.Item>
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
