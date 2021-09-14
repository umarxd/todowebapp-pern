import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        userInfo ? (
          <>
            <RouteComponent {...routeProps} />
          </>
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
