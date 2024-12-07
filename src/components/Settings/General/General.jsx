import React, { useState, useEffect } from 'react';
import css from './General.module.css';
import { resendVerification } from '../../../utils/registration';
import { auth } from '../../../utils/firebase/firebaseConfig';
import { toast } from 'react-hot-toast';
import DeleteAccModal from '../../Modals/DeleteAccModal/DeleteAccModal';
import {
  fetchUserSettings,
  saveUserSettings,
} from '../../../utils/userSettingsService.js';

export default function General() {
  const [emailVerified, setEmailVerified] = useState(true);
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userSettings, setUserSettings] = useState({
    birthday: '',
    name: '',
    height: '',
    weight: '',
    isAdmin: false,
    notifications: {
      reminder: false,
      updates: false,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          setEmail(user.email || '');
          setEmailVerified(user.emailVerified);

          const settings = await fetchUserSettings();
          setUserSettings(settings);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await saveUserSettings(userSettings);
      toast.success('Settings saved successfully.', {
        style: { backgroundColor: 'green' },
      });
    } catch (error) {
      toast.error('Error saving settings: ' + error.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserSettings(prevSettings => ({
        ...prevSettings,
        [parent]: {
          ...prevSettings[parent],
          [child]: value === 'on' ? true : value === 'off' ? false : value,
        },
      }));
    } else {
      setUserSettings(prevSettings => ({
        ...prevSettings,
        [name]: value,
      }));
    }
  };

  return (
    <div className={css.container}>
      <h2>General</h2>
      <div className={css.content}>
        <div className={css.formwrapper}>
          <ul className={css.list}>
            <li className={css.listitem}>
              <label className={css.text}>Name</label>
              <input
                type="text"
                name="name"
                value={userSettings.name || ''}
                onChange={handleChange}
                className={css.input}
              />
            </li>
            <li className={css.listitem}>
              <label className={css.text}>E-mail</label>
              <input
                type="text"
                value={email}
                readOnly
                className={css.input}
                disabled
              />
              {!emailVerified && (
                <div className={css.warning}>
                  <p className={css.errorMessage}>
                    Your email is not verified.
                  </p>
                  <a className={css.resendLink} onClick={resendVerification}>
                    Resend verification email
                  </a>
                </div>
              )}
            </li>
            <li className={css.detailsListitem}>
              <p className={css.text}>Details:</p>
              <div className={css.detailsWrapper}>
                <div className={css.details}>
                  <label className={css.detailsText}>Date of birth</label>
                  <input
                    type="date"
                    name="birthday"
                    value={userSettings.birthday || ''}
                    onChange={handleChange}
                    className={css.detailsInput}
                  />
                </div>
                <div className={css.details}>
                  <label className={css.detailsText}>Height</label>
                  <input
                    type="text"
                    name="height"
                    value={userSettings.height || ''}
                    onChange={handleChange}
                    className={css.detailsInput}
                  />
                </div>
                <div className={css.details}>
                  <label className={css.detailsText}>Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={userSettings.weight || ''}
                    onChange={handleChange}
                    className={css.detailsInput}
                  />
                </div>
              </div>
            </li>
            <li className={css.notificationsListitem}>
              <p className={css.text}>Notifications:</p>
              <div className={css.notificationsWrapper}>
                <label className={css.groupitem}>
                  <input
                    type="checkbox"
                    name="notifications.reminder"
                    checked={userSettings.notifications.reminder}
                    className={css.notificationsInput}
                    onChange={handleChange}
                  />
                  <span>Email to remind about trainings</span>
                </label>
                <label className={css.groupitem}>
                  <input
                    type="checkbox"
                    name="notifications.updates"
                    checked={userSettings.notifications.updates}
                    className={css.notificationsInput}
                    onChange={handleChange}
                  />
                  <span>Weekly product updates</span>
                </label>
              </div>
            </li>
          </ul>
          <div className={css.btnWrapper}>
            <button className={css.btn} onClick={handleSave}>
              Save
            </button>
            <button
              className={css.btnDelete}
              onClick={() => setIsModalOpen(true)}
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <DeleteAccModal
          closeModal={() => setIsModalOpen(false)}
          email={email}
        />
      )}
    </div>
  );
}
