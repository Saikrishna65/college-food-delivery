import React, { useState, useEffect, useContext } from "react";
import { Camera, Edit2 } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Profile = () => {
  const { user: contextUser, updateUser } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (contextUser) {
      setUser(contextUser);
    }
  }, [contextUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log(user);

    // call context update function
    if (updateUser) {
      updateUser(user);
    }
  };

  const handleCancel = () => {
    setUser(contextUser);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-[10px] shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-[#1f2937] text-center mb-4">
            {isEditing ? "Update your profile" : "Profile"}
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Profile Picture */}
            {/* <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition"
                  >
                    <Camera className="w-6 h-6 text-white" />
                    <input
                      type="file"
                      id="profile-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div> */}

            {/* Form Fields */}
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name || ""}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <div className="bg-gray-50 py-2 px-3 border border-gray-300 rounded-md">
                    {user.name}
                  </div>
                )}
              </div>

              {/* <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email || ""}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <div className="bg-gray-50 py-2 px-3 border border-gray-300 rounded-md">
                    {user.email}
                  </div>
                )}
              </div> */}

              <div>
                <label
                  htmlFor="mobile"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Mobile
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={user.mobile || ""}
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <div className="bg-gray-50 py-2 px-3 border border-gray-300 rounded-md">
                    {user.mobile}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4">
                {isEditing ? (
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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
