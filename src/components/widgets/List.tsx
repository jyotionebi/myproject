// src/components/widgets/UserList.tsx (Simpler version)
import React from 'react';
import type { User } from '../../api/crud';
import SimpleButton from './Button';

interface UserListProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, loading, onEdit, onDelete }) => {
  if (loading) {
    return <p>Loading users...</p>;
  }

  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div>
      <h2>Users ({users.length})</h2>
      <table border={1} style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id || '-'}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;