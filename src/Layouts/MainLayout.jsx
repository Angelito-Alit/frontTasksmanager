import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useRefresh } from '../components/RefreshContext/RefreshContext';
import AutoRefresh from '../components/RefreshContext/AutoRefresh';

const { Header, Content, Sider } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const { lastRefresh } = useRefresh();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    } else {
      setUserRole(localStorage.getItem('userRole') || 'user');
    }
  }, [navigate]);

  const handleRefresh = () => {
    console.log('Actualizando datos: ', new Date().toLocaleTimeString());
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

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
  
  if (userRole === 'master') {
    menuItems.push({
      key: '4',
      label: <Link to="/profiles" style={{ color: '#FFFFFF' }}>Administrar Usuarios</Link>
    });
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AutoRefresh onRefresh={handleRefresh} />
      <Sider style={{ background: '#F39C12' }}>
        <div className="logo" />
        <Menu 
          theme="" 
          mode="inline" 
          defaultSelectedKeys={['1']} 
          style={{ background: '#F39C12' }}
          items={menuItems} 
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
            {React.Children.map(children, child => 
              React.cloneElement(child, { key: lastRefresh })
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;