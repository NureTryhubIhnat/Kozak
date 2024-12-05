import css from './Info.module.css';

export default function Info() {
  return (
    <div className={css.container}>
      <h2>Info</h2>
      <div className={css.content}>
        <ul className={css.list}>
          <li className={css.listitem}>
            <label>Bio</label>
            <textarea
              className={css.textarea}
              placeholder="Enter your bio here..."
            ></textarea>
          </li>
          <li className={css.listitem}>
            <label>Birthday</label>
            <input type="date" className={css.date} />
          </li>
          <li className={css.listitem}>
            <label>Country</label>
            <select className={css.select}>
              <option value="">Select a country</option>
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="Germany">Germany</option>
              <option value="Russia">Ukraine</option>
            </select>
          </li>
        </ul>
        <hr className={css.line} />
        <div className={css.contactsWrapper}>
          <h3>Contacts</h3>
          <ul className={css.list}>
            <li className={css.listitem}>
              <label>Phone</label>
              <input type="text" value="" className={css.input} />
            </li>
            <li className={css.listitem}>
              <label>WebSite</label>
              <input type="text" value="" className={css.input} />
            </li>
          </ul>
        </div>
        <button className={css.btn}>Save</button>
      </div>
    </div>
  );
}
