import css from './UsersAdminPage.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchUserSettings } from '../../utils/userSettingsService';
import { FaListUl } from 'react-icons/fa';
import { IoBarChart } from 'react-icons/io5';
import clsx from 'clsx';

export default function UserAdminPage() {
  const [AdminName, setAdminName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUserSettings();
      setAdminName(userData.name || '');
    };

    fetchUserData();
  }, []);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.titleWrapper}>
          <h2 className={css.title}>
            <span className={css.partTitle}>Users</span> Administration
          </h2>
          <p>( Admin: {AdminName} )</p>
        </div>
        <ul className={css.list}>
          <li>
            <NavLink
              to="users-list"
              className={({ isActive }) =>
                clsx(css.navLink, { [css.activeNavLink]: isActive })
              }
            >
              <p>List</p>
              <FaListUl />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="users-statistics"
              className={({ isActive }) =>
                clsx(css.navLink, { [css.activeNavLink]: isActive })
              }
            >
              <p>Statistics</p>
              <IoBarChart />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admins-list"
              className={({ isActive }) =>
                clsx(css.navLink, { [css.activeNavLink]: isActive })
              }
            >
              <p>Admins</p>
              <FaListUl />
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
