import React, { useState, useEffect, useRef } from 'react';
import { Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import { groupService } from '../../services/api';

import PermissionsProvider from '../../components/GroupTasks/PermissionsProvider';
import GroupTasksBoard from '../../components/GroupTasks/GroupTasksBoard';
import AddGroupTaskModal from '../../components/GroupTasks/AddGroupTaskModal';
import EditGroupTaskModal from '../../components/GroupTasks/EditGroupTaskModal';
import AddCollaboratorModal from '../../components/GroupTasks/AddCollaboratorModal';

const GroupTasksPage = () => {
  const { groupId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddCollaboratorModalVisible, setIsAddCollaboratorModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const tasksData = await groupService.getGroupTasks(groupId);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      message.error('Error al obtener las tareas del grupo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    
    // Configurar actualización automática cada 3 segundos
    intervalRef.current = setInterval(() => {
      fetchTasks();
    }, 3000);
    
    // Limpiar el intervalo al desmontar el componente
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [groupId]);

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsEditModalVisible(true);
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await groupService.completeGroupTask(groupId, taskId);
      setTasks(tasks.map((task) => (task._id === taskId ? response.task : task)));
      message.success('Tarea marcada como completada.');
    } catch (error) {
      console.error('Error al completar la tarea:', error);
      message.error('Error al completar la tarea.');
    }
  };

  return (
    <PermissionsProvider groupId={groupId}>
      {({ isAdmin, isCollaborator, collaborators, reloadPermissions }) => (
        <div>
          <h1 style={{ color: '#D35400' }}>Tareas del Grupo</h1>

          {isAdmin && (
            <div style={{ marginBottom: '16px' }}>
              <Button
                type="primary"
                onClick={() => setIsAddModalVisible(true)}
                style={{ background: '#E67E22', borderColor: '#E67E22', marginRight: '8px' }}
              >
                Agregar Tarea
              </Button>
              <Button
                type="primary"
                onClick={() => setIsAddCollaboratorModalVisible(true)}
                style={{ background: '#E67E22', borderColor: '#E67E22' }}
              >
                Agregar Colaborador
              </Button>
            </div>
          )}

          <GroupTasksBoard
            tasks={tasks}
            isAdmin={isAdmin}
            isCollaborator={isCollaborator}
            onEditTask={handleEditTask}
            onCompleteTask={handleCompleteTask}
          />

          <AddGroupTaskModal
            visible={isAddModalVisible}
            onCancel={() => setIsAddModalVisible(false)}
            groupId={groupId}
            collaborators={collaborators}
            onTaskAdded={handleTaskAdded}
          />

          <EditGroupTaskModal
            visible={isEditModalVisible}
            onCancel={() => setIsEditModalVisible(false)}
            groupId={groupId}
            task={currentTask}
            collaborators={collaborators}
            onTaskUpdated={handleTaskUpdated}
          />

          <AddCollaboratorModal
            visible={isAddCollaboratorModalVisible}
            onCancel={() => setIsAddCollaboratorModalVisible(false)}
            groupId={groupId}
            onCollaboratorAdded={reloadPermissions}
          />
        </div>
      )}
    </PermissionsProvider>
  );
};

export default GroupTasksPage;