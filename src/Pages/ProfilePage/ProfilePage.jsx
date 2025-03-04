import React, { useState, useEffect, useRef } from 'react';
import { Card, message } from 'antd';
import { userService } from '../../services/api';
import UsersTable from '../../components/Users/UsersTable';
import EditUserModal from '../../components/Users/EditUserModal';

const ProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const intervalRef = useRef(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      message.error('Error al cargar la lista de usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    intervalRef.current = setInterval(() => {
      fetchUsers();
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditModalVisible(true);
  };

  const handleModalClosed = (updated) => {
    setEditModalVisible(false);
    if (updated) {
      fetchUsers();
    }
  };

  return (
    <div>
      <h2 style={{ color: '#D35400', marginBottom: '20px' }}>Administración de Usuarios</h2>
      <Card style={{ width: '100%' }}>
        <UsersTable 
          users={users} 
          loading={loading} 
          onEditUser={handleEditUser} 
        />
      </Card>

      <EditUserModal
        visible={editModalVisible}
        onCancel={handleModalClosed}
        user={selectedUser}
      />
    </div>
  );
};

export default ProfilePage;