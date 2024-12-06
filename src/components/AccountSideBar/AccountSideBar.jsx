import css from './AccountSideBar.module.css';
import { NavLink } from 'react-router-dom';

export default function AccountSideBar() {
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
      </ul>
    </div>
  );
}
