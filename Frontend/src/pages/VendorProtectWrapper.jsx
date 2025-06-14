import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";

const VendorProtectWrapper = ({ children }) => {
  const { vendor, loading } = useContext(AppContext);

  if (loading) return <Loading />; // Or your spinner

  if (!vendor) return <Navigate to="/login" replace />;

  return children;
};

export default VendorProtectWrapper;
