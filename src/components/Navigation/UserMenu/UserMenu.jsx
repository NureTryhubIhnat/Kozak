import css from './UserMenu.module.css';
import { logout } from '../../../utils/registration';
import { VscAccount } from 'react-icons/vsc';
import { NavLink } from 'react-router-dom';
import Dropdown from './Dropdown/Dropdown';
import React, { useState, useEffect } from 'react';
import { fetchUserSettings } from '../../../utils/userSettingsService';

export default function UserMenu() {
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
      {isAdmin && <Dropdown />}

      <div className={css.navList}>
        <NavLink to="/" onClick={logout} className={css.navLink}>
          Logout
        </NavLink>
        <NavLink to="/account" className={css.accLink}>
          <VscAccount />
        </NavLink>
      </div>
    </div>
  );
}
