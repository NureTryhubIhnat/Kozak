import css from "./UserMenu.module.css";
import { logout } from "../../../utils/registration";

export default function UserMenu() {
  return (
    <div className={css.navList}>
      <button className={css.navLink}>Account</button>
      <button onClick={logout} className={css.navLink}>
        Logout
      </button>
    </div>
  );
}
