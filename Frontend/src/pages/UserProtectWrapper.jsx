import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("user token"); // ✅ use "user token" only
  const { user, setUser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
        }
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("user token"); // ✅ remove correct token
        navigate("/login");
      })
      .finally(() => setIsLoading(false));
  }, [token, setUser, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
