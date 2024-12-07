import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import HomePage from '../../pages/HomePage/HomePage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import UserAccountPage from '../../pages/UserAccounPage/UserAccountPage';
import General from '../Settings/General/General';
import ChangePassword from '../Settings/ChangePassword/ChangePassword';
import UsersAdminPage from '../../pages/UsersAdminPage/UsersAdminPage';
import UsersList from '../Administration/Users/UsersList/UsersList';

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
        <Route path="/users" element={<UsersAdminPage />}>
          <Route index element={<UsersList />} />
          <Route path="users-list" element={<UsersList />} />
          {/* <Route path="users-statistics" element={<UsersStatistics />} /> */}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
