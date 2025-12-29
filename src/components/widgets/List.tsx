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
    return <p className="loading-text">Loading users...</p>;
  }

  if (users.length === 0) {
    return <p className="empty-text">No users found. Add your first user!</p>;
  }

  return (
    <div>
      <h2>Users ({users.length})</h2>
      <table className="user-table">
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
                <div className="action-buttons">
                  <SimpleButton 
                    text="Edit" 
                    onClick={() => onEdit(user)} 
                    variant="secondary"
                    disabled={!user.id}
                  />
                  <SimpleButton 
                    text="Delete" 
                    onClick={() => user.id && onDelete(user.id)} 
                    variant="danger"
                    disabled={!user.id}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;