import css from './HomePage.module.css';
import { IoCheckmarkDone } from 'react-icons/io5';
import { FiDownload } from 'react-icons/fi';

const HomePage = () => {
  return (
    <div className={css.container}>
      <div className={css.titleContainer}>
        <h1 className={css.title}>
          Welcome to <span className={css.partTitle}>Kozachok</span> - Your Home
          Workout Companion!
        </h1>
        <p className={css.text}>
          Transform your fitness journey with Kozachok, the ultimate platform
          for home workouts! Whether you're a beginner or a seasoned athlete, we
          bring you expert-crafted exercises, personalized plans, and the
          motivation to stay on track - all from the comfort of your home.
        </p>
      </div>
      <div className={css.advantagesContainer}>
        <div className={css.listContainer}>
          <h2>Why Kozachok?</h2>
          <ul className={css.list}>
            <li className={css.listItem}>
              <IoCheckmarkDone className={css.tick} />
              <p className={css.text}>Easy-to-follow home workout routines</p>
            </li>
            <li className={css.listItem}>
              <IoCheckmarkDone className={css.tick} />
              <p className={css.text}>No equipment? No problem!</p>
            </li>
            <li className={css.listItem}>
              <IoCheckmarkDone className={css.tick} />
              <p className={css.text}>
                Tailored programs for every fitness level
              </p>
            </li>
            <li className={css.listItem}>
              <IoCheckmarkDone className={css.tick} />
              <p className={css.text}>Stay active, healthy, and energized</p>
            </li>
          </ul>
        </div>
        <img src="/images/fitness.png" className={css.img} />
      </div>
      <div className={css.downloadContainer}>
        <h2 className={css.downloadTitle}>Download Our App Today!</h2>
        <p className={css.text}>
          Take Kozachok wherever you go! Get access to all our workouts, track
          your progress, and stay inspired with our mobile app. Available now on
          Android.
        </p>
        <div className={css.btnContainer}>
          <button className={css.btn}>
            Download <FiDownload />
          </button>
          <p className={css.text}>-</p>
          <p className={css.text}>
            Your fitness goals are just a few clicks away. Start your Kozachok
            journey today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
