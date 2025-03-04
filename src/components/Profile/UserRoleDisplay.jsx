import React from 'react';
import { Form, Input } from 'antd';

const UserRoleDisplay = ({ role }) => {
  return (
    <Form.Item label="Rol">
      <Input 
        value={role === 'master' ? 'Administrador' : 'Usuario'} 
        disabled 
        style={{ 
          color: role === 'master' ? '#D35400' : '#2980B9',
          fontWeight: 'bold'
        }}
      />
    </Form.Item>
  );
};

export default UserRoleDisplay;