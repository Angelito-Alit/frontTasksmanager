import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import GroupsPage from './Pages/GroupPage/GroupsPage';
import GroupTasksPage from './Pages/GroupTasksPage/GroupTasksPage';
import UserProfilePage from './Pages/ProfilePage/UserProfilePage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import MainLayout from './Layouts/MainLayout';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const MasterRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== 'master') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  useEffect(() => {
    const checkAuth = () => {
      const currentPath = window.location.pathname;
      const publicPaths = ['/', '/login', '/register'];
      
      if (!publicPaths.includes(currentPath)) {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
        }
      }
    };
    
    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/dashboard" element={
          <PrivateRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </PrivateRoute>
        } />
        
        <Route path="/groups" element={
          <PrivateRoute>
            <MainLayout>
              <GroupsPage />
            </MainLayout>
          </PrivateRoute>
        } />
        
        <Route path="/groupTasks/:groupId" element={
          <PrivateRoute>
            <MainLayout>
              <GroupTasksPage />
            </MainLayout>
          </PrivateRoute>
        } />
        
        <Route path="/profile" element={
          <PrivateRoute>
            <MainLayout>
              <UserProfilePage />
            </MainLayout>
          </PrivateRoute>
        } />
        
        <Route path="/profiles" element={
          <MasterRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </MasterRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;