// src/context/AppContext.jsx
import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import { io } from "socket.io-client";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // — Axios Config —
  axios.defaults.baseURL = "http://localhost:4000/api/v1";
  const userToken = localStorage.getItem("user token");
  const vendorToken = localStorage.getItem("vendor token");
  const token = userToken || vendorToken;

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  // — App State —
  const [user, setUser] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState({
    userProfile: false,
    vendorProfile: false,
    login: false,
  });

  // — Fetch vendor profile —
  const fetchVendorProfile = useCallback(async () => {
    setLoading((l) => ({ ...l, vendorProfile: true }));
    try {
      const res = await axios.get("/vendors/profile");
      setVendor(res.data.vendor);
    } catch (err) {
      console.error("Vendor profile error:", err);
      setAuthError(err);
    } finally {
      setLoading((l) => ({ ...l, vendorProfile: false }));
    }
  }, []);

  // — Fetch vendor notifications —
  const fetchVendorNotifications = useCallback(async () => {
    try {
      const res = await axios.get("/vendors/notifications");
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error("Notif fetch failed:", err);
      setAuthError(err);
    }
  }, []);

  // — Initialize data on token load —
  useEffect(() => {
    if (token) {
      fetchVendorProfile();
      fetchVendorNotifications();
    }
  }, [token, fetchVendorProfile, fetchVendorNotifications]);

  // — Socket.IO setup for real-time notifications —
  const socketRef = useRef(null);
  useEffect(() => {
    if (!vendor?._id) return;

    // create socket once
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:4000/vendors", {
        withCredentials: true,
      });
    }
    const socket = socketRef.current;

    // on connect, join vendor room
    socket.on("connect", () => {
      socket.emit("joinVendorRoom", vendor._id);
    });

    // listen for incoming notifications
    socket.on("new_notification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    // cleanup on unmount or vendor change
    return () => {
      socket.off("new_notification");
      socket.off("connect");
      // do not disconnect here if you want to preserve across component trees;
      // if you do want to disconnect when vendor logs out, call socket.disconnect() elsewhere
    };
  }, [vendor?._id]);

  // — Context Value —
  const value = {
    user,
    vendor,
    cart,
    orders,
    notifications,
    authError,
    loading,

    setUser,
    setVendor,
    setNotifications,

    fetchVendorProfile,
    fetchVendorNotifications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
