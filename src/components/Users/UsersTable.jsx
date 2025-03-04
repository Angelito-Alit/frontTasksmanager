import React from 'react';
import { Table, Button } from 'antd';
import UserRoleTag from './UserRoleTag';

const UsersTable = ({ users, loading, onEditUser }) => {
  const columns = [
    {
      title: 'Nombre de usuario',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <UserRoleTag role={role} />
    },
    {
      title: 'Último inicio de sesión',
      dataIndex: 'last_login',
      key: 'last_login',
      render: (date) => (date ? new Date(date).toLocaleString() : 'Nunca')
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          onClick={() => onEditUser(record)}
          style={{ background: '#E67E22', borderColor: '#E67E22' }}
        >
          Editar
        </Button>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={users} 
      rowKey="_id" 
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default UsersTable;