import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import HomePage from '../../pages/HomePage/HomePage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import UserAccountPage from '../../pages/UserAccounPage/UserAccountPage';
import General from '../Settings/General/General';
import ChangePassword from '../Settings/ChangePassword/ChangePassword';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<UserAccountPage />}>
          <Route index element={<General />} />
          <Route path="general" element={<General />} />
          <Route path="change-password" element={<ChangePassword />} />
          {/* <Route path="statistic" element={<Statistic />} /> */}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
