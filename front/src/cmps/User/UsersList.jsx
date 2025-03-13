import { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/auth.service';
import UserPreview from './UserPreview';
import './User.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    handleUsers();
  }, []);

  const handleUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(JSON.parse(res));
    } catch (error) {
      setUsers([]);
    }
  };

  return (
    <div className='user-list--container'>
      {users.map((item, index) => {
        return <UserPreview key={`user-lisr_${index}`} user={item} />;
      })}
    </div>
  );
};

export default UsersList;
