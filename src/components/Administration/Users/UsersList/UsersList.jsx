import React, { useEffect, useState } from 'react';
import {
  fetchAllUserSettings,
  saveUserSettings,
  deleteUserSettings,
} from '../../../../utils/userSettingsService';
import { deleteUserAccount } from '../../../../utils/registration';
import { toast } from 'react-hot-toast';
import css from './UsersList.module.css';
import { BiEditAlt } from 'react-icons/bi';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchAllUserSettings();
        const filteredUsers = usersData.filter(user => !user.isAdmin);
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

  const handleSave = async userId => {
    const userToUpdate = users.find(user => user.id === userId);
    try {
      await saveUserSettings(userToUpdate); // Обновляем данные пользователя
      toast.success('User data updated successfully', {
        style: {
          backgroundColor: 'green',
        },
      });
    } catch (err) {
      toast.error('Failed to update user data');
    }
  };

  const handleDelete = async userId => {
    try {
      await deleteUserSettings(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

      toast.success('User deleted successfully', {
        style: {
          backgroundColor: 'green',
        },
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
                  B-day:
                  <input
                    value={new Date(user.birthday).toLocaleDateString()}
                    onChange={e => handleInputChange(e, user.id, 'birthday')}
                    className={css.input}
                  />
                </label>
                <button className={css.btn} onClick={() => handleSave(user.id)}>
                  <BiEditAlt />
                </button>
              </div>
              <div className={css.inputWrapper}>
                <label className={css.label}>
                  Height:
                  <input
                    value={user.height}
                    onChange={e => handleInputChange(e, user.id, 'height')}
                    className={css.input}
                  />
                </label>
                <button className={css.btn} onClick={() => handleSave(user.id)}>
                  <BiEditAlt />
                </button>
              </div>
              <div className={css.inputWrapper}>
                <label className={css.label}>
                  Weight:
                  <input
                    value={user.weight}
                    onChange={e => handleInputChange(e, user.id, 'weight')}
                    className={css.input}
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
