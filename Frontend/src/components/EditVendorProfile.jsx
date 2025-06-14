import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const EditVendorProfile = () => {
  const { vendor, setVendor } = useContext(AppContext);
  const [formData, setFormData] = useState({
    ownerName: "",
    restaurantName: "",
    email: "",
    contactNumber: "",
    address: "",
    profileImage: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vendor) {
      setFormData({
        ownerName: vendor.ownerName || "",
        restaurantName: vendor.restaurantName || "",
        email: vendor.email || "",
        contactNumber: vendor.contactNumber || "",
        address: vendor.address || "",
        profileImage: vendor.profileImage || "",
      });
    }
  }, [vendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/vendors/update`,
        formData,
        { withCredentials: true }
      );

      setVendor(res.data.vendor);
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Restaurant Name
          </label>
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Profile Image URL
          </label>
          <input
            type="url"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Profile Preview"
              className="mt-2 w-32 h-32 object-cover rounded-full"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditVendorProfile;
