import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";

const UserProtectWrapper = ({ children }) => {
  const { user, loading } = useContext(AppContext);

  if (loading) return <Loading />; // Or your spinner

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default UserProtectWrapper;
