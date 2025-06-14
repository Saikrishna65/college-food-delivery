import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Notifications = () => {
  const { notifications } = useContext(AppContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications.</p>
      ) : (
        <ul className="space-y-2">
          {[...notifications].reverse().map((n) => (
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
