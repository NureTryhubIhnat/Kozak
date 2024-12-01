import { useState } from "react";
import { changePassword } from "../../../utils/registration";

import css from "./ChangePassword.module.css";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async () => {
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className={css.container}>
      <h2>Change Password</h2>
      <div className={css.content}>
        <ul className={css.list}>
          <li className={css.listitem}>
            <label>Current Password</label>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={css.input} />
          </li>
          <li className={css.listitem}>
            <label>New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={css.input} />
          </li>
          <li className={css.listitem}>
            <label>Repeat New Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={css.input} />
          </li>
        </ul>
        {error && <div className={css.error}>{error}</div>}
        <button className={css.btn} onClick={handlePasswordChange}>
          Save
        </button>
      </div>
    </div>
  );
}
