import css from './AccountSideBar.module.css';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchUserSettings } from '../../utils/userSettingsService';

export default function Menu() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUserSettings();
      setIsAdmin(userData.isAdmin || false);
    };

    fetchUserData();
  }, []);

  return (
    <div className={css.container}>
      <ul className={css.list}>
        <li className={css.listItem}>
          <NavLink
            to="general"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            General
          </NavLink>
        </li>
        <li className={css.listItem}>
          <NavLink
            to="change-password"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Change password
          </NavLink>
        </li>
        {!isAdmin && (
          <li className={css.listItem}>
            <NavLink
              to="statistic"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              Statistic
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
