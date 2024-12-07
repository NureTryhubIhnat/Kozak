import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import css from './Dropdown.module.css';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  return (
    <div className={css.dropdownContainer}>
      <button onClick={toggleDropdown} className={css.dropdownButton}>
        Administration <MdOutlineArrowDropDownCircle />
      </button>

      {isOpen && (
        <ul className={css.dropdownList}>
          <li key="1" className={css.dropdownItem}>
            <NavLink
              to="/users"
              className={css.navLink}
              onClick={() => setIsOpen(false)}
            >
              Users
            </NavLink>
          </li>
          <li key="1" className={css.dropdownItem}>
            <NavLink
              to="/workouts"
              className={css.navLink}
              onClick={() => setIsOpen(false)}
            >
              Workouts
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
