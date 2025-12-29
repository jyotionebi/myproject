// src/components/widgets/UserCard.tsx
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
    <div className="user-card">
      <h3>{user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>ID:</strong> {user.id || 'No ID'}</p>
      <div className="card-actions">
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