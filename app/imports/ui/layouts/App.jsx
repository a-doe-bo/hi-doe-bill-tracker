import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import ListBill from '../pages/ListBill';
import CreateUserAccount from '../pages/CreateUserAccount';
import NotFound from '../pages/NotFound';
import NavBar from '../components/NavBar';
import SignOut from '../pages/SignOut';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import { ROLE } from '../../api/role/Role';
import BillDetails from '../pages/BillDetails';
import ListAccounts from '../pages/ListAccounts';
import SavedBills from '../pages/SavedBills';
import ListAwaitingReview from '../pages/ListAwaitingReview';
import CreateComment from '../pages/CreateComment';
import ListTestimonies from '../pages/ListTestimonies';
import UserPage from '../pages/UserPage';
import RequestedAccounts from '../pages/RequestedAccounts';
import RequestAccounts from '../pages/RequestAccounts';
import DraftTestimony from '../pages/DraftTestimony';
import AssignedBills from '../pages/AssignedBills';
import Pdf from '../pages/Pdf';
import EditComment from '../pages/EditComment';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/userPage" element={<UserPage />} />
        <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
        <Route path="/list" element={<ProtectedRoute><ListBill /></ProtectedRoute>} />
        <Route path="/savedBills" element={<ProtectedRoute><SavedBills /></ProtectedRoute>} />
        <Route path="/assignedBills" element={<ProtectedRoute><AssignedBills /></ProtectedRoute>} />
        <Route path="/listAwaitingReviews" element={<ProtectedRoute><ListAwaitingReview /></ProtectedRoute>} />
        <Route path="/listTestimonies" element={<ProtectedRoute> <ListTestimonies /> </ProtectedRoute>} />
        <Route path="/draftTestimony" element={<ProtectedRoute> <DraftTestimony /> </ProtectedRoute>} />
        <Route path="/requestNewAccount" element={<ProtectedRoute> <RequestAccounts /> </ProtectedRoute>} />
        <Route path="/bill/:_id" element={<ProtectedRoute><BillDetails /></ProtectedRoute>} />
        <Route path="/createComment/:_id" element={<ProtectedRoute><CreateComment /></ProtectedRoute>} />
        <Route path="/editComment/:_id" element={<ProtectedRoute><EditComment /></ProtectedRoute>} />
        <Route path="/createAccount" element={<AdminProtectedRoute><CreateUserAccount /></AdminProtectedRoute>} />
        <Route path="/requestedAccounts" element={<AdminProtectedRoute><RequestedAccounts /></AdminProtectedRoute>} />
        <Route path="/admin" element={<AdminProtectedRoute><ListAccounts /></AdminProtectedRoute>} />
        <Route path="/notauthorized" element={<NotAuthorized />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/draftTestimony/:_id" element={<ProtectedRoute><DraftTestimony /></ProtectedRoute>} />
      </Routes>
    </div>
  </Router>
);

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  console.log('ProtectedRoute', isLogged);
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  children: <Landing />,
};

export default App;
