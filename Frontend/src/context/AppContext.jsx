import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AppContext = createContext();

axios.defaults.withCredentials = true; // Ensure cookies are sent

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [vendorOrders, setVendorOrders] = useState([]);
  const [vendorDashboardData, setVendorDashboardData] = useState(null);
  const [vendorActive, setVendorActive] = useState(false);
  const [loadingActive, setLoadingActive] = useState(false);
  const [favourites, setFavorites] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  console.log(favourites);

  // ✅ Fetch user/vendor and cart/notifications/favotites
  const fetchProfileAndCart = useCallback(async () => {
    setLoading(true);

    try {
      const userRes = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/profile`
      );
      if (userRes.data) {
        setUser(userRes.data);
        setVendor(null);
        setNotifications([]);

        try {
          const cartRes = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/cart`
          );
          setCart(cartRes.data.cart || []);
        } catch (cartErr) {
          console.error("Error fetching cart:", cartErr);
        }

        try {
          const favouritesRes = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/favorites`
          );
          setFavorites(favouritesRes.data.favourites || []);
        } catch (favouritesErr) {
          console.error("Error fetching favorites:", favouritesErr);
        }

        try {
          const foodItemsRes = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/food/items`
          );
          setFoodItems(foodItemsRes.data.data || []);
        } catch (foodItemErr) {
          console.error("Error fetching food items:", foodItemErr);
        }

        try {
          const userOrdersRes = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/orders/user`
          );
          setUserOrders(userOrdersRes.data.orders || []);
        } catch (userOrdersErr) {
          console.error("Error fetching user orders:", userOrdersErr);
        }

        setLoading(false);
        return;
      }
    } catch {
      setUser(null);
    }

    try {
      const vendorRes = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/vendors/profile`
      );
      if (vendorRes.data) {
        setVendor(vendorRes.data);
        setUser(null);
        setNotifications(vendorRes.data.notifications || []);
      }
    } catch {
      setVendor(null);
      setNotifications([]);
    }

    setLoading(false);
  }, []);

  // ✅ Fetch vendor orders
  const refreshVendorOrders = useCallback(async () => {
    if (!vendor?._id) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/orders/vendor`
      );
      setVendorOrders(res.data.orders || []);
    } catch (err) {
      console.error("Error fetching vendor orders:", err);
    }
  }, [vendor]);

  // ✅ Fetch vendor dashboard data
  const fetchVendorDashboard = useCallback(async () => {
    if (!vendor?._id) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/vendors/dashboard-data`
      );
      console.log("Vendor Dashboard Data:", res.data);
      setVendorDashboardData(res.data);
    } catch (err) {
      console.error("Error fetching vendor dashboard:", err);
    }
  }, [vendor]);

  const fetchVendorStatus = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/vendors/status`
      );
      setVendorActive(res.data.isAvailable);
    } catch (err) {
      console.error("Error fetching vendor status:", err);
    } finally {
      setLoadingActive(false);
    }
  };

  // ✅ Initial fetch
  useEffect(() => {
    fetchProfileAndCart();
  }, [fetchProfileAndCart]);

  // ✅ Refetch vendor orders when vendor changes
  useEffect(() => {
    if (vendor) {
      refreshVendorOrders();
      fetchVendorDashboard();
      fetchVendorStatus();
    }
  }, [vendor, refreshVendorOrders, fetchVendorDashboard]);

  const toggleVendorActive = async () => {
    try {
      const newStatus = !vendorActive;
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/vendors/toggle-availability`
      );
      setVendorActive(newStatus);
    } catch (err) {
      console.error("Error toggling vendor status:", err);
    }
  };

  const updateUser = async (userData) => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/users/update-profile`;
      const res = await axios.patch(url, {
        name: userData.name,
        mobile: userData.mobile,
      });

      if (res.data) {
        setUser(res.data);
        // Optionally refresh cart or other data
        await fetchProfileAndCart();
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const addToCart = async (foodItemId, quantity) => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/cart/add`;
      await axios.post(url, { foodItemId, quantity });

      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`);
      setCart(res.data.cart || []);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const updateCartItemQuantity = async (quantity, foodItemId) => {
    if (quantity < 1) {
      console.warn("Quantity must be at least 1");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BASE_URL}/cart/update`;
      await axios.put(url, { foodItemId, quantity });

      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`);
      setCart(res.data.cart || []);
    } catch (err) {
      console.error("Error updating cart item quantity:", err);
    }
  };

  const removeCartItem = async (foodItemId) => {
    try {
      const url = `${
        import.meta.env.VITE_BASE_URL
      }/cart/remove?foodItemId=${foodItemId}`;
      await axios.delete(url, { withCredentials: true });

      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`, {
        withCredentials: true,
      });
      setCart(res.data.cart || []);
    } catch (err) {
      console.error("Error removing cart item:", err);
    }
  };

  const addToFavourites = async (foodItemId) => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/users/add-favorite`;
      await axios.post(url, { foodItemId });

      // Update favourites after adding
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/favorites`
      );
      setFavorites(res.data.favourites || []);
    } catch (err) {
      console.error("Error adding to favourites:", err);
    }
  };

  const removeFromFavourites = async (foodItemId) => {
    try {
      const url = `${
        import.meta.env.VITE_BASE_URL
      }/users/remove-favorite?foodItemId=${foodItemId}`;
      await axios.delete(url, { withCredentials: true });

      // Update favourites after removal
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/favorites`
      );
      setFavorites(res.data.favourites || []);
    } catch (err) {
      console.error("Error removing from favourites:", err);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`);
      setUser(null);
      setCart([]);
    } catch (err) {
      console.error("Error during user logout:", err);
    }
  };

  const logoutVendor = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/vendors/logout`);
      setVendor(null);
      setVendorOrders([]); // ✅ Clear orders on logout
    } catch (err) {
      console.error("Error during vendor logout:", err);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BASE_URL}/orders/status`, {
        orderId,
        orderStatus: newStatus,
      });
      // Refresh vendor orders after update
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/orders/vendor`
      );
      setVendorOrders(res.data.orders || []);
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        vendor,
        setVendor,
        cart,
        userOrders,
        setCart,
        favourites,
        foodItems,
        loading,
        updateUser,
        addToCart,
        logoutUser,
        loadingActive,
        notifications,
        logoutVendor,
        vendorOrders,
        refreshVendorOrders,
        updateOrderStatus,
        vendorDashboardData,
        vendorActive,
        toggleVendorActive,
        updateCartItemQuantity,
        removeCartItem,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
