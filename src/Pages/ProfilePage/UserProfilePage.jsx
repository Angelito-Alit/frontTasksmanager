import React, { useState, useEffect } from 'react';
import { Card, Form, message } from 'antd';
import { userService } from '../../services/api';
import ProfileForm from '../../components/Profile/ProfileForm';
import ProfileLoading from '../../components/Profile/ProfileLoading';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const fetchUserData = async () => {
    try {
      const userData = await userService.getCurrentUser();
      setUser(userData);
      form.setFieldsValue({
        username: userData.username,
        email: userData.email
      });
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      message.error('No se pudieron cargar los datos del perfil');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdateProfile = async (values) => {
    try {
      setLoading(true);
      await userService.updateProfile(values);
      message.success('Perfil actualizado con éxito');
      
      // Actualizar datos del usuario
      fetchUserData();
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      message.error('Error al actualizar el perfil');
      setLoading(false);
    }
  };

  if (loading && !user) {
    return <ProfileLoading />;
  }

  return (
    <div>
      <h2 style={{ color: '#D35400', marginBottom: '20px' }}>Mi Perfil</h2>
      <Card style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        <ProfileForm 
          form={form}
          user={user}
          loading={loading}
          onSubmit={handleUpdateProfile}
        />
      </Card>
    </div>
  );
};

export default UserProfilePage;