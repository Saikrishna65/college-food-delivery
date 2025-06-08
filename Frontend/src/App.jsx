import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Orders from "./pages/Orders";
import FoodPage from "./pages/FoodPage";
import Restaurants from "./pages/Restaurents";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import MyProfile from "./pages/MyProfile";
import Profile from "./pages/Profile";
import Favourites from "./pages/Favourites";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import FoodDetails from "./pages/FoodDetails";
import ScrollToTop from "./components/ScrollToTop";
import RestaurantDetails from "./pages/RestaurantDetails";
import Sample from "./pages/Sample";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import VendorDashboard from "./pages/VendorDashboard";
import Notifications from "./components/Notifications";
import OrderTable from "./components/OrderTable";
import VendorDashboardData from "./components/VendorDashboardData";

const App = () => {
  return (
    <div className="bg-gradient-to-b from-teal-50 to-orange-50">
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/fooditems"
          element={
            <UserProtectWrapper>
              <FoodPage />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/restaurants"
          element={
            <UserProtectWrapper>
              <Restaurants />
            </UserProtectWrapper>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/food/:id"
          element={
            <UserProtectWrapper>
              <FoodDetails />
            </UserProtectWrapper>
          }
        />
        <Route path="/sample" element={<Sample />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route
          path="/my-profile"
          element={
            <UserProtectWrapper>
              <MyProfile />
            </UserProtectWrapper>
          }
        >
          <Route path="/my-profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/vendor/dashboard" element={<VendorDashboard />}>
          <Route path="orders" element={<OrderTable />} />
          <Route path="dashboard" element={<VendorDashboardData />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;
