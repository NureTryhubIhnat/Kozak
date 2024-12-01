import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/HomePage/HomePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import UserAccountPage from "../../pages/UserAccounPage/UserAccountPage";
import General from "../Settings/General/General";
import ChangePassword from "../Settings/ChangePassword/ChangePassword";
import Info from "../Settings/Info/Info";
import SocialLinks from "../Settings/SocialLinks/SocialLinks";
import Notifications from "../Settings/Notifications/Notifications";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<UserAccountPage />}>
          <Route index element={<General />} />
          <Route path="general" element={<General />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="info" element={<Info />} />
          <Route path="social-links" element={<SocialLinks />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
