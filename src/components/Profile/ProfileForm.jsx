import React from 'react';
import { Form, Input, Button } from 'antd';
import UserRoleDisplay from './UserRoleDisplay';

const ProfileForm = ({ 
  form, 
  user, 
  loading, 
  onSubmit 
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item
        name="username"
        label="Nombre de usuario"
        rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario' }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Por favor ingresa tu email' },
          { type: 'email', message: 'Por favor ingresa un email válido' }
        ]}
      >
        <Input disabled />
      </Form.Item>
      
      {user && user.role && <UserRoleDisplay role={user.role} />}
      
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ background: '#E67E22', borderColor: '#E67E22' }}
        >
          Actualizar Perfil
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;