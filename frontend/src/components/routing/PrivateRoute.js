import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// This is a mock authentication check
// In a real implementation, this would check for a valid token in localStorage
// and verify the user is authenticated
const isAuthenticated = () => {
  // For demo purposes, we'll just return true to simulate an authenticated user
  // In production, this would check for a valid token
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;
