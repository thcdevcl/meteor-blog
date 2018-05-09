import React from "react";
import { PropTypes } from "prop-types";
import { withApollo } from "react-apollo";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import { CURRENT_USER } from "./Router";

const MultiRoute = ({ client, component, exact, path }) => {
  const { user } = client.readQuery({ query: CURRENT_USER });
  if (!user)
    return <PublicRoute exact={exact} path={path} component={component} />;

  return <PrivateRoute exact={exact} path={path} component={component} />;
};

MultiRoute.propTypes = {
  client: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
};

export default withApollo(MultiRoute);