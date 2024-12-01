import css from './SocialLinks.module.css';
import { FaTwitter } from 'react-icons/fa6';
import { FaFacebookSquare, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function SocialLinks() {
  return (
    <div className={css.container}>
      <h2>Social links</h2>
      <ul className={css.list}>
        <li className={css.listItem}>
          <label>Twitter</label>
          <div className={css.inputWrapper}>
            <input type="text" value="" className={css.input} />
            <button type="button" className={css.btn}>
              Connect to <FaTwitter />
            </button>
          </div>
        </li>
        <li className={css.listItem}>
          <label>Facebook</label>
          <div className={css.inputWrapper}>
            <input type="text" value="" className={css.input} />
            <button type="button" className={css.btn}>
              Connect to <FaFacebookSquare />
            </button>
          </div>
        </li>
        <li className={css.listItem}>
          <label>Google+</label>
          <div className={css.inputWrapper}>
            <input type="text" value="" className={css.input} />
            <a
              href="/cdn-cgi/l/email-protection"
              data-cfemail="f9979498818e9c9595b994989095d79a9694"
            >
              [email&#160;protected]
            </a>
          </div>
        </li>
        <li className={css.listItem}>
          <label>LinkedIn</label>
          <div className={css.inputWrapper}>
            <input type="text" value="" className={css.input} />
            <button type="button" className={css.btn}>
              Connect to <FaLinkedin />
            </button>
          </div>
        </li>
        <li className={css.listItem}>
          <label>Instagram</label>
          <div className={css.inputWrapper}>
            <input type="text" value="" className={css.input} />
            <button type="button" className={css.btn}>
              Connect to <FaInstagram />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}
