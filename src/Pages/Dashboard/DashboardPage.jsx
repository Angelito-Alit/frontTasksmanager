import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../../services/api';
import AddTaskModal from '../../components/Tasks/AddTaskModal';
import EditTaskModal from '../../components/Tasks/EditTaskModal';
import TasksBoard from '../../components/Tasks/TasksBoard';
import { useRefresh } from '../../components/RefreshContext/RefreshContext';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const navigate = useNavigate();
  const { lastRefresh } = useRefresh();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      message.warning('Debes iniciar sesión para acceder al dashboard.');
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [navigate, lastRefresh]); 

  const fetchTasks = async () => {
    try {
      const tasksData = await taskService.getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      message.error('Error al cargar las tareas.');
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsEditModalVisible(true);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  return (
    <div className="dashboard-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#D35400', fontSize: '28px', margin: 0 }}>Dashboard de Tareas Personales</h1>
        
        <Button
          type="primary"
          onClick={() => setIsAddModalVisible(true)}
          style={{ 
            background: '#E67E22', 
            borderColor: '#E67E22', 
            fontSize: '16px', 
            height: '40px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Agregar Tarea
        </Button>
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
        <TasksBoard
          tasks={tasks}
          onEditTask={handleEditTask}
        />
      </div>

      <AddTaskModal
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onTaskAdded={handleTaskAdded}
      />

      <EditTaskModal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        task={currentTask}
        onTaskUpdated={handleTaskUpdated}
      />
    </div>
  );
};

export default DashboardPage;