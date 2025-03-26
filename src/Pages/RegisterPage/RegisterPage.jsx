import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';

const RegisterPage = () => {
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
      await authService.register(values);
      message.success('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      message.error('Error al registrar. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject('Por favor ingresa tu contraseña');
    }
    
    if (value.length < 8) {
      return Promise.reject('La contraseña debe tener al menos 8 caracteres');
    }
    
    if (!/[A-Z]/.test(value)) {
      return Promise.reject('La contraseña debe incluir al menos una letra mayúscula');
    }
    
    if (!/[a-z]/.test(value)) {
      return Promise.reject('La contraseña debe incluir al menos una letra minúscula');
    }
    
    if (!/[0-9]/.test(value)) {
      return Promise.reject('La contraseña debe incluir al menos un número');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return Promise.reject('La contraseña debe incluir al menos un carácter especial (!@#$%^&*(),.?":{}|<>)');
    }
    
    return Promise.resolve();
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center', color: '#D35400' }}>Registro</h2>
      <Form onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario' }]}
        >
          <Input placeholder="Nombre de usuario" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Por favor ingresa tu email' },
            { type: 'email', message: 'Por favor ingresa un email válido' }
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ validator: validatePassword }]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Por favor confirma tu contraseña' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Las contraseñas no coinciden'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirmar contraseña" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ background: '#E67E22', borderColor: '#E67E22', width: '100%' }}
          >
            Registrarse
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <span>¿Ya tienes una cuenta? </span>
        <Button type="link" onClick={() => navigate('/login')} style={{ color: '#673417' }}>
          Inicia sesión aquí
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;