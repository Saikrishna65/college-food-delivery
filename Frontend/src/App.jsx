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
import VendorProtectWrapper from "./pages/VendorProtectWrapper";
import VendorAddFood from "./components/VendorAddFood";
import EditVendorProfile from "./components/EditVendorProfile";
import VendorFoodItems from "./components/VendorFoodItems";

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
        <Route
          path="/vendor"
          element={
            <VendorProtectWrapper>
              <VendorDashboard />
            </VendorProtectWrapper>
          }
        >
          <Route path="orders" element={<OrderTable />} />
          <Route path="dashboard" element={<VendorDashboardData />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="add-food" element={<VendorAddFood />} />
          <Route path="food-items" element={<VendorFoodItems />} />
          <Route path="profile" element={<EditVendorProfile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
