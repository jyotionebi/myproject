
import { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser, type User } from '../api/crud';
import SimpleButton from '../components/widgets/Button';
import UserList from '../components/widgets/List';

const CrudComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);


  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      alert('Please enter name and email');
      return;
    }

    const userData = { name, email };

    try {
      if (editingId) {
        // Update existing user
        await updateUser(editingId, { ...userData, id: editingId });
        alert('User updated!');
      } else {
        // Create new user
        await createUser(userData);
        alert('User created!');
      }
      
      // Reset form
      setName('');
      setEmail('');
      setEditingId(null);
      
      // Reload users
      loadUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user: User) => {
    setName(user.name);
    setEmail(user.email);
    setEditingId(user.id || null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this user?')) {
      try {
        await deleteUser(id);
        loadUsers();
        alert('User deleted!');
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const cancelEdit = () => {
    setName('');
    setEmail('');
    setEditingId(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User data</h1>
      
      {/* Form */}
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '20px', 
        marginBottom: '20px',
        borderRadius: '5px'
      }}>
        <h2>{editingId ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: '8px', marginLeft: '10px', width: '200px' }}
              placeholder="Enter name"
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '8px', marginLeft: '10px', width: '200px' }}
              placeholder="Enter email"
            />
          </div>
          
          <div>
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
          </div>
        </form>
      </div>
      
      {/* User List */}
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