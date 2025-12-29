import { useState, useEffect, useCallback } from 'react';
import { getUsers, createUser, updateUser, deleteUser, type User } from '../api/crud';
import SimpleButton from '../components/widgets/Button';
import UserList from '../components/widgets/List';

const CrudComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      alert('Please enter name and email');
      return;
    }

    try {
      if (editingId) {
        await updateUser(editingId, { name, email });
        alert('User updated!');
      } else {
        await createUser({ name, email });
        alert('User created!');
      }

      setName('');
      setEmail('');
      setEditingId(null);
      loadUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user: User) => {
    setName(user.name);
    setEmail(user.email);
    setEditingId(user.id ?? null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this user?')) return;

    try {
      await deleteUser(id);
      alert('User deleted!');
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const cancelEdit = () => {
    setName('');
    setEmail('');
    setEditingId(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>User Data</h1>

      {/* Form */}
      <div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 6 }}>
        <h2>{editingId ? 'Edit User' : 'Add User'}</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              style={{ marginLeft: 10, padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              style={{ marginLeft: 10, padding: 8 }}
            />
          </div>

          <SimpleButton
            text={editingId ? 'Update User' : 'Add User'}
            type="submit"
            color={editingId ? 'orange' : 'green'}
          />

          {editingId && (
            <SimpleButton
              text="Cancel"
              onClick={cancelEdit}
              color="gray"
            />
          )}
        </form>
      </div>

      {/* List */}
      <UserList
        users={users}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CrudComponent;
