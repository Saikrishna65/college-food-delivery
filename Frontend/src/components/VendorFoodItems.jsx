// src/components/VendorFoodItems.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

export default function VendorFoodItems() {
  const { vendor } = useContext(AppContext);
  const vendorId = vendor?._id;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // For inline editing
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});

  // 1️⃣ Fetch vendor’s items
  useEffect(() => {
    if (!vendorId) return;
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/food/vendor-food-items`)
      .then((res) => {
        setItems(res.data.data || []);
      })
      .catch((err) => console.error("Load error:", err))
      .finally(() => setLoading(false));
  }, [vendorId]);

  // 2️⃣ Start editing: populate form
  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      isAvailable: item.isAvailable,
      category: item.category,
      tags: item.tags.join(", "),
      restaurantAddress: item.restaurantAddress,
    });
  };

  // 3️⃣ Cancel editing
  const handleCancel = () => setEditingId(null);

  // 4️⃣ Save changes
  const handleSave = async (foodId) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/food/update`,
        {
          foodId,
          name: form.name,
          description: form.description,
          price: form.price,
          image: form.image,
          quantity: form.quantity,
          isAvailable: form.isAvailable,
          category: form.category,
          restaurantAddress: form.restaurantAddress,
          tags: form.tags,
        }
      );
      const updated = res.data.data || res.data;
      setItems((prev) =>
        prev.map((itm) => (itm._id === foodId ? updated : itm))
      );
      setEditingId(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // 5️⃣ Toggle availability only
  const toggleAvailability = async (foodId) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/food/toggle-availability`,
        { foodId },
        { headers: { "Content-Type": "application/json" } }
      );
      const isAvailable = res.data.data?.isAvailable ?? res.data.isAvailable;
      setItems((prev) =>
        prev.map((itm) => (itm._id === foodId ? { ...itm, isAvailable } : itm))
      );
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading your menu…</p>;
  if (!items.length)
    return <p className="text-center mt-8">No food items found.</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => {
        const isEditing = editingId === item._id;
        return (
          <div
            key={item._id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            {/* Image container: only show when not editing */}
            {!isEditing && (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-4">
              {isEditing ? (
                <>
                  <input
                    className="w-full mb-2 p-1 border rounded"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                  <textarea
                    className="w-full mb-2 p-1 border rounded"
                    rows="2"
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                  />
                  <input
                    type="number"
                    className="w-full mb-2 p-1 border rounded"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: +e.target.value }))
                    }
                  />
                  <input
                    className="w-full mb-2 p-1 border rounded"
                    value={form.image}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, image: e.target.value }))
                    }
                  />
                  <input
                    type="number"
                    className="w-full mb-2 p-1 border rounded"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, quantity: +e.target.value }))
                    }
                  />
                  <input
                    className="w-full mb-2 p-1 border rounded"
                    value={form.restaurantAddress}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        restaurantAddress: e.target.value,
                      }))
                    }
                  />
                  <input
                    className="w-full mb-2 p-1 border rounded"
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                  />
                  <input
                    className="w-full mb-2 p-1 border rounded"
                    value={form.tags}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, tags: e.target.value }))
                    }
                  />
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={form.isAvailable}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          isAvailable: e.target.checked,
                        }))
                      }
                      className="form-checkbox h-5 w-5 text-green-500"
                    />
                    <span className="ml-2">
                      {form.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSave(item._id)}
                      className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-300 px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">₹{item.price}</span>
                    <span className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={item.isAvailable}
                        onChange={() => toggleAvailability(item._id)}
                        className="form-checkbox h-5 w-5 text-green-500"
                      />
                      <span
                        className={
                          item.isAvailable ? "text-green-600" : "text-red-600"
                        }
                      >
                        {item.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </label>
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
