import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '3rem', color: '#D35400' }}>¡Bienvenido al Task Manager </h1>
      <p style={{ fontSize: '1.5rem', color: '#34495E' }}>Gestiona tus tareas  🦖</p>
      <Link to="/login">
        <Button type="primary" style={{ backgroundColor: '#E67E22', borderColor: '#D35400' }}>
          Iniciar Sesión
        </Button>
      </Link>
      <Link to="/register">
        <Button type="primary" style={{ backgroundColor: '#E67E22', borderColor: '#D35400' }}>
          Registrarse
        </Button>
      </Link>
    </div>
  );
};

export default LandingPage;