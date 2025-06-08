// src/pages/Notifications.jsx
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Notifications = () => {
  const { notifications, setNotifications, socket, fetchVendorNotifications } =
    useContext(AppContext);

  // 1️⃣ Fetch notifications once on mount
  useEffect(() => {
    fetchVendorNotifications();
  }, [fetchVendorNotifications]);

  // 2️⃣ Mark as read visually (optional backend sync can be added)
  useEffect(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, [setNotifications]);

  // 3️⃣ Real-time socket listener
  useEffect(() => {
    if (!socket) return;

    const handler = (notif) => {
      setNotifications((prev) => [notif, ...prev]);
      toast.info(notif.message);
    };

    socket.on("newNotification", handler);
    return () => socket.off("newNotification", handler);
  }, [socket, setNotifications]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li
              key={n._id}
              className={`p-4 rounded shadow ${
                n.read ? "bg-white" : "bg-blue-50"
              }`}
            >
              <div className="flex justify-between">
                <p className="text-gray-800">{n.message}</p>
                <span className="text-xs text-gray-400">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
