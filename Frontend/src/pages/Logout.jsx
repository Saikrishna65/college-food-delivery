import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Logout = () => {
  const navigate = useNavigate();
  const { user, vendor, setUser, setVendor } = useContext(AppContext);

  useEffect(() => {
    const doLogout = async () => {
      // Check both tokens in localStorage
      const userToken = localStorage.getItem("user token");
      const vendorToken = localStorage.getItem("vendor token");

      let token = null;
      let entity = null;

      if (userToken) {
        token = userToken;
        entity = "users";
      } else if (vendorToken) {
        token = vendorToken;
        entity = "vendors";
      } else {
        // No token found
        return navigate("/login");
      }

      const logoutUrl = `${import.meta.env.VITE_BASE_URL}/${entity}/logout`;

      try {
        const { status } = await axios.get(logoutUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (status === 200) {
          localStorage.removeItem("user token");
          localStorage.removeItem("vendor token");
          setUser(null);
          setVendor(null);
          navigate("/login");
        }
      } catch (err) {
        console.error("Logout failed:", err);
        // Even if logout fails, clear tokens
        localStorage.removeItem("user token");
        localStorage.removeItem("vendor token");
        setUser(null);
        setVendor(null);
        navigate("/login");
      }
    };

    doLogout();
  }, [navigate, setUser, setVendor]);

  return <div>Logging out…</div>;
};

export default Logout;
