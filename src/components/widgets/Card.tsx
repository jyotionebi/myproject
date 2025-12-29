import React from 'react';
import type { User } from '../../api/crud';
import SimpleButton from './Button';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '5px',
      backgroundColor: '#100f0fff'
    }}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>ID: {user.id || 'No ID'}</p>
      <div>
        <SimpleButton 
          text="Edit" 
          onClick={() => onEdit(user)} 
          color="orange"
        />
        <SimpleButton 
          text="Delete" 
          onClick={() => user.id && onDelete(user.id)} 
          color="red"
        />
      </div>
    </div>
  );
};

export default UserCard;