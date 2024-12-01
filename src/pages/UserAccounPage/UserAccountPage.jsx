import AccountSideBar from "../../components/AccountSideBar/AccountSideBar";
import css from "./UserAccountPage.module.css";
import { Outlet } from "react-router-dom";

const UserAccountPage = () => {
  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <AccountSideBar />
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserAccountPage;
