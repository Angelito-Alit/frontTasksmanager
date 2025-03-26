import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await authService.login(values);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('userRole', response.role || 'user');
      
      message.success('Inicio de sesión exitoso');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      message.error('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center', color: '#D35400' }}>Iniciar Sesión</h2>
      <Form onFinish={onFinish}>
        <Form.Item 
          name="email" 
          rules={[{ required: true, message: 'Por favor ingresa tu email' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item 
          name="password" 
          rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading} 
            style={{ background: '#E67E22', borderColor: '#E67E22', width: '100%', marginBottom: '10px' }}
          >
            Iniciar Sesión
          </Button>
          <div style={{ textAlign: 'center' }}>
            <span>¿No tienes una cuenta? </span>
            <Button type="link" onClick={() => navigate('/register')} style={{ color: '#673417', padding: 0 }}>
              Registrarse
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;