import React from "react";
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

const App = () => {
  return (
    <div className="bg-gradient-to-b from-teal-50 to-orange-50">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fooditems" element={<FoodPage />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/login" element={<Login />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="my-profile" element={<MyProfile />}>
          <Route path="/my-profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="orders" element={<Orders />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
