import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../../services/api';
import AddTaskModal from '../../components/Tasks/AddTaskModal';
import EditTaskModal from '../../components/Tasks/EditTaskModal';
import TasksBoard from '../../components/Tasks/TasksBoard';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      message.warning('Debes iniciar sesión para acceder al dashboard.');
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [navigate]);

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
    <div>
      <h1 style={{ color: '#D35400' }}>Dashboard</h1>

      <Button
        type="primary"
        onClick={() => setIsAddModalVisible(true)}
        style={{ background: '#E67E22', borderColor: '#E67E22', marginBottom: '16px' }}
      >
        Agregar Tarea
      </Button>

      <TasksBoard
        tasks={tasks}
        onEditTask={handleEditTask}
      />

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