import React, { useState } from "react";
import { Camera, Edit2, ChevronDown } from "lucide-react";
import { assets } from "../assets/assets";

// Pickup points data
const PICKUP_POINTS = [
  { id: 1, name: "Main Cafeteria" },
  { id: 2, name: "Library Entrance" },
  { id: 3, name: "Student Center" },
  { id: 4, name: "Engineering Block" },
  { id: 5, name: "Sports Complex" },
];

// Default user data
const DEFAULT_USER = {
  fullName: "Batman",
  mobileNumber: "+1 (555) 123-4567",
  rollNumber: "CS2023001",
  pickupPoint: "Main Cafeteria",
  profilePic: assets.batman,
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(DEFAULT_USER);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({
        ...prev,
        profilePic: imageUrl,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Profile data:", profile);
  };

  const handleCancel = () => {
    setProfile(DEFAULT_USER);
    setIsEditing(false);
  };

  const handlePickupSelect = (pickupPoint) => {
    setProfile((prev) => ({
      ...prev,
      pickupPoint,
    }));
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-[10px] shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold text-[#1f2937]">
              {isEditing ? "Update your information" : "Profile"}
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <img
                  src={profile.profilePic}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer shadow-md transition-colors duration-200 hover:bg-blue-600"
                  >
                    <Camera className="w-6 h-6 text-white" />
                    <input
                      type="file"
                      id="profile-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div className="mb-6">
                <label
                  htmlFor="fullName"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm text-base box-border focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                ) : (
                  <div className="bg-gray-50 py-2 px-3 border border-gray-300 rounded-md shadow-sm">
                    {profile.fullName}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="mobileNumber"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={profile.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm text-base box-border focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your mobile number"
                    required
                  />
                ) : (
                  <div className="bg-gray-50 py-2 px-3 border border-gray-300 rounded-md shadow-sm">
                    {profile.mobileNumber}
                  </div>
                )}
              </div>

              {/* Pickup Point */}
              <div className="mb-6">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Pickup Point
                </label>
                {isEditing ? (
                  <div className="relative w-full box-border text-base">
                    <div
                      className="w-full py-2 px-3 border border-gray-300 rounded-md bg-white cursor-pointer flex justify-between items-center box-border"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {profile.pickupPoint}
                      <ChevronDown className="ml-2" />
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute left-0 w-full max-h-40 overflow-y-auto border border-gray-300 rounded-md bg-white shadow-lg z-10 top-[calc(100%+0.25rem)]">
                        {PICKUP_POINTS.map((point) => (
                          <div
                            key={point.id}
                            className="py-2 px-3 cursor-pointer hover:bg-gray-100"
                            onClick={() => handlePickupSelect(point.name)}
                          >
                            {point.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 py-2 px-3 border border-gray-300 rounded-md shadow-sm">
                    {profile.pickupPoint}
                  </div>
                )}
              </div>

              {/* Roll Number */}
              <div className="mb-6">
                <label
                  htmlFor="rollNumber"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Roll Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    value={profile.rollNumber}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm text-base box-border focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your roll number"
                    required
                  />
                ) : (
                  <div className="bg-gray-50 py-2 px-3 border border-gray-300 rounded-md shadow-sm">
                    {profile.rollNumber}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-0">
                {isEditing ? (
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 cursor-pointer transition-colors duration-200 hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="rounded-md text-white py-2 px-4 bg-[#ff4545] hover:bg-[#fc2c2c]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full flex gap-2 justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 cursor-pointer transition-colors duration-200 hover:bg-blue-700"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
