import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirigir al login si no hay token
    } else {
      setUserRole(localStorage.getItem('userRole') || 'user');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Eliminar el token y cualquier otra información del usuario del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');

    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  // Define menu items using the new format
  const menuItems = [
    {
      key: '1',
      label: <Link to="/dashboard" style={{ color: '#FFFFFF' }}>Dashboard</Link>
    },
    {
      key: '2',
      label: <Link to="/groups" style={{ color: '#FFFFFF' }}>Grupos</Link>
    },
    {
      key: '3',
      label: <Link to="/profile" style={{ color: '#FFFFFF' }}>Perfil</Link>
    }
  ];
  
  // Agregar opción de administración solo para usuarios master
  if (userRole === 'master') {
    menuItems.push({
      key: '4',
      label: <Link to="/profiles" style={{ color: '#FFFFFF' }}>Administrar Usuarios</Link>
    });
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ background: '#F39C12' }}>
        <div className="logo" />
        <Menu 
          theme="" 
          mode="inline" 
          defaultSelectedKeys={['1']} 
          style={{ background: '#F39C12' }}
          items={menuItems} // Using items prop instead of children
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#D35400', padding: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button
            type="primary"
            onClick={handleLogout}
            style={{ background: '#E67E22', borderColor: '#E67E22', marginRight: '16px' }}
          >
            Cerrar sesión
          </Button>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#FFFFFF' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;