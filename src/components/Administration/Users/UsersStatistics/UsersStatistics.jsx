import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import UsersAge from './UsersAge/UsersAge';
import { fetchAllUserSettings } from '../../../../utils/adminPanelUsersService';
import CountUp from 'react-countup'; // Для анимации подсчёта
import { useInView } from 'react-intersection-observer'; // Для отслеживания прокрутки

import css from './UsersStatistics.module.css';

const UsersStatistics = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true, // Срабатывает один раз
    threshold: 0.1, // Когда элемент будет виден на 10% (можно настроить)
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchAllUserSettings();
        const filteredUsers = usersData.filter(user => !user.isAdmin); // Фильтруем не админов
        setUsers(filteredUsers);
        setCount(filteredUsers.length); // Записываем количество пользователей
      } catch (err) {
        setError('Failed to fetch user settings');
        toast.error(err);
      }
    };

    getUsers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={css.container}>
      <h2 className={css.title}>Users Age Statistic</h2>
      <UsersAge />

      <div ref={ref} className={css.userCount}>
        <h2 className={css.title}>Number of users</h2>
        <div className={css.counterContainer}>
          <p className={css.text}>
            Number of registered users (except administrators)
          </p>
          {inView ? (
            <CountUp
              start={0}
              end={count}
              duration={5}
              separator=","
              className={css.counter}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersStatistics;
