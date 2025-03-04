import React from 'react';
import { Spin } from 'antd';

const ProfileLoading = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Spin size="large" />
      <div style={{ marginTop: '10px' }}>Cargando perfil...</div>
    </div>
  );
};

export default ProfileLoading;