import React from 'react';
import { Tag } from 'antd';

const UserRoleTag = ({ role }) => {
  return (
    <Tag color={role === 'master' ? '#D35400' : '#2980B9'}>
      {role === 'master' ? 'Administrador' : 'Usuario'}
    </Tag>
  );
};

export default UserRoleTag;