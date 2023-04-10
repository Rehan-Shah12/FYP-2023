import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage.js";
import About from "./pages/About.js";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register.js";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login.js";
import Dashboard from "./pages/User/Dashboard.js";
import PrivateRoute from "./components/Routes/Private.js";
import ForgotPassword from "./pages/Auth/ForgotPassword.js";
import AdminRoute from "./components/Routes/AdminRoute.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import CreateCategory from "./pages/Admin/CreateCategory.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";
import Feedback from "./pages/Admin/Feedback.js";
import AdminProfile from "./pages/Admin/AdminProfile.js";
import OrderHistory from "./pages/User/OrderHistory.js";
import Profile from "./pages/User/Profile.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/order-history" element={<OrderHistory />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/feedback" element={<Feedback />} />
          <Route path="admin/profile" element={<AdminProfile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
