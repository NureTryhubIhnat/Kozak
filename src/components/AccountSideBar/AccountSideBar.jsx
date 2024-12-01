import css from "./AccountSideBar.module.css";
import { NavLink } from "react-router-dom";

export default function AccountSideBar() {
  return (
    <div className={css.container}>
      <ul className={css.list}>
        <li className={css.listItem}>
          <NavLink to="general" className={({ isActive }) => (isActive ? `${css.link} ${css.active}` : css.link)}>
            General
          </NavLink>
        </li>
        <li className={css.listItem}>
          <NavLink to="change-password" className={({ isActive }) => (isActive ? `${css.link} ${css.active}` : css.link)}>
            Change password
          </NavLink>
        </li>
        <li className={css.listItem}>
          <NavLink to="info" className={({ isActive }) => (isActive ? `${css.link} ${css.active}` : css.link)}>
            Info
          </NavLink>
        </li>
        <li className={css.listItem}>
          <NavLink to="social-links" className={({ isActive }) => (isActive ? `${css.link} ${css.active}` : css.link)}>
            Social links
          </NavLink>
        </li>
        <li className={css.listItem}>
          <NavLink to="notifications" className={({ isActive }) => (isActive ? `${css.link} ${css.active}` : css.link)}>
            Notifications
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
