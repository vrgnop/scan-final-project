import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  const location = useLocation();
  const { isAuth } = useAuth();

  if (!isAuth) {
    return (
      <Navigate
        to={"/authorization/signin"}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export default RequireAuth;
