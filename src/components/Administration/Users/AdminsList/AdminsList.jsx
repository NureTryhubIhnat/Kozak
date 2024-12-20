import React, { useEffect, useState } from 'react';
import {
  saveUserSettings,
  fetchAllUserSettings,
  deleteUserSettings,
} from '../../../../utils/adminPanelUsersService';
import { toast } from 'react-hot-toast';
import css from './AdminsList.module.css';
import { BiEditAlt } from 'react-icons/bi';

export default function AdminsList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchAllUserSettings();
        const filteredUsers = usersData.filter(user => user.isAdmin);
        setUsers(filteredUsers);
      } catch (err) {
        setError('Failed to fetch user settings');
        toast.error(err);
      }
    };

    getUsers();
  }, []);

  const handleInputChange = (e, userId, field) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, [field]: e.target.value } : user
      )
    );
  };

  const handleCheckboxChange = (e, userId) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, isAdmin: e.target.checked } : user
    );
    setUsers(updatedUsers);
  };

  const handleSave = async userId => {
    const userToUpdate = users.find(user => user.id === userId);

    if (!userToUpdate) {
      toast.error('User not found');
      return;
    }

    const updatedData = {
      name: userToUpdate.name,
      birthday: userToUpdate.birthday,
      height: userToUpdate.height,
      weight: userToUpdate.weight,
      isAdmin: userToUpdate.isAdmin,
    };

    try {
      await saveUserSettings(userId, updatedData);
      toast.success('User data updated successfully', {
        style: { backgroundColor: 'green' },
      });
    } catch (err) {
      toast.error('Failed to update user data');
    }
  };

  const handleDelete = async userId => {
    try {
      await deleteUserSettings(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

      toast.success('User successfully deleted', {
        style: { backgroundColor: 'green' },
      });
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className={css.container}>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul className={css.list}>
          {users.map(user => (
            <li key={user.id} className={css.listItem}>
              <div className={css.inputWrapper}>
                <label className={css.label}>
                  Name:
                  <input
                    value={user.name}
                    onChange={e => handleInputChange(e, user.id, 'name')}
                    className={css.input}
                  />
                </label>
                <button className={css.btn} onClick={() => handleSave(user.id)}>
                  <BiEditAlt />
                </button>
              </div>
              <div className={css.inputWrapper}>
                <label className={css.label}>
                  B-day:{' '}
                  <span className={css.notChangeText}>
                    {' '}
                    (You can't change this info)
                  </span>
                  <input
                    value={user.birthday}
                    readOnly
                    className={css.dateinput}
                  />
                </label>
                <button
                  className={css.dateBtn}
                  onClick={() => handleSave(user.id)}
                  disabled
                >
                  <BiEditAlt />
                </button>
              </div>

              <div className={css.isAdminInputWrapper}>
                <label className={css.isAdminLabel}>
                  Admin:
                  <input
                    type="checkbox"
                    checked={user.isAdmin}
                    onChange={e => handleCheckboxChange(e, user.id)}
                    className={css.checkbox}
                  />
                </label>
                <button className={css.btn} onClick={() => handleSave(user.id)}>
                  <BiEditAlt />
                </button>
              </div>
              <button
                className={css.btnDelete}
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
