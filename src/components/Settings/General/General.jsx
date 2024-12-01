import React, { useState, useEffect } from 'react';
import css from './General.module.css';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import DeleteAccModal from '../../Modals/DeleteAccModal/DeleteAccModal';

export default function General() {
  const [emailVerified, setEmailVerified] = useState(true);
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setEmail(user.email || '');
      setEmailVerified(user.emailVerified);
    }
  }, []);

  const handleResendVerification = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        await sendEmailVerification(user);
        toast.success('Verification email sent successfully.', {
          style: { backgroundColor: 'green' },
        });
      } catch (error) {
        toast.error('Error sending verification email: ' + error.message);
      }
    } else {
      toast.error('No user logged in.');
    }
  };

  return (
    <div className={css.container}>
      <h2>General</h2>
      <div className={css.content}>
        <div className={css.formwrapper}>
          <ul className={css.list}>
            <li className={css.listitem}>
              <label>Username</label>
              <input type="text" value="" className={css.input} />
            </li>
            <li className={css.listitem}>
              <label>Name</label>
              <input type="text" value="" className={css.input} />
            </li>
            <li className={css.listitem}>
              <label>E-mail</label>
              <input type="text" value={email} readOnly className={css.input} />
              {!emailVerified && (
                <div className={css.warning}>
                  <p className={css.errorMessage}>
                    Your email is not verified.
                  </p>
                  <a
                    className={css.resendLink}
                    onClick={handleResendVerification}
                  >
                    Resend verification email
                  </a>
                </div>
              )}
            </li>
            <li className={css.listitem}>
              <label>Company</label>
              <input type="text" value="" className={css.input} />
            </li>
          </ul>
          <div className={css.btnWrapper}>
            <button className={css.btn}>Save</button>
            <button
              className={css.btnDelete}
              onClick={() => setIsModalOpen(true)}
            >
              Delete account
            </button>
          </div>
        </div>
        <div className={css.photowrapper}>
          <img
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            className={css.img}
          />
          <div>
            <label className={css.uploadWrapper}>
              Upload new photo:
              <input type="file" className={css.uploadInput} />
            </label>
            <p className={css.uploadText}>
              ( Allowed JPG, GIF or PNG. Max size of 800K )
            </p>
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
