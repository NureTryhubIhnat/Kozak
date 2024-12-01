import css from './Notifications.module.css';

export default function Notifications() {
  return (
    <div className={css.container}>
      <div className={css.activity}>
        <h3>Activity</h3>
        <div className={css.groupitem}>
          <label>
            <input type="checkbox" className={css.input} />
            <span>Email me when someone comments on my article</span>
          </label>
        </div>
        <div className={css.groupitem}>
          <label>
            <input type="checkbox" className={css.input} />
            <span>Email me when someone answers on my forum thread</span>
          </label>
        </div>
        <div className={css.groupitem}>
          <label>
            <input type="checkbox" className={css.input} />
            <span>Email me when someone follows me</span>
          </label>
        </div>
      </div>

      <div className={css.application}>
        <h3>Application</h3>
        <div className={css.groupitem}>
          <label>
            <input type="checkbox" className={css.input} />
            <span>News and announcements</span>
          </label>
        </div>
        <div className={css.groupitem}>
          <label>
            <input type="checkbox" className={css.input} />
            <span>Weekly product updates</span>
          </label>
        </div>
        <div className={css.groupitem}>
          <label>
            <input type="checkbox" className={css.input} />
            <span>Weekly blog digest</span>
          </label>
        </div>
      </div>
    </div>
  );
}
