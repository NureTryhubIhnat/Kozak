import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { toast } from 'react-hot-toast';
import { fetchAllUserSettings } from '../../../../../utils/adminPanelUsersService';

const UsersAge = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);

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

  useEffect(() => {
    if (users.length > 0) {
      const calculateAge = birthDate => {
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const m = currentDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
          return age - 1;
        }
        return age;
      };

      const ageGroups = users.reduce((acc, user) => {
        const birthDate = new Date(user.birthday); // Формат: yyyy-mm-dd
        if (!isNaN(birthDate)) {
          const age = calculateAge(birthDate);

          acc[age] = (acc[age] || 0) + 1;
        }
        return acc;
      }, {});

      const formattedData = Object.keys(ageGroups).map(age => ({
        age: age,
        count: ageGroups[age],
      }));

      setChartData(formattedData);
    }
  }, [users]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="age" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#fdce70" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsersAge;
