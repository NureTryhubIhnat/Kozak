import React, { useState, useEffect } from 'react';
import css from './Navbar.module.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../utils/firebase/firebaseConfig';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);

    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className={css.navContainer}>
      <div className={css.navWrapper}>
        <a href="/">
          <img src="images/logo.jpg" className={css.logoImg} alt="logo" />
        </a>
        <div id="nav-mobile" className={css.navList}>
          {user ? <UserMenu /> : <AuthNav />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
