import React from 'react';
import GroupTasksColumn from './GroupTasksColumn';

const GroupTasksBoard = ({ 
  tasks,
  isAdmin, 
  isCollaborator, 
  onEditTask, 
  onCompleteTask 
}) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {});

  const taskStatuses = ['pendiente', 'en progreso', 'completada'];

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {taskStatuses.map((taskStatus) => (
        <GroupTasksColumn
          key={taskStatus}
          title={taskStatus}
          tasks={groupedTasks[taskStatus] || []}
          isAdmin={isAdmin}
          isCollaborator={isCollaborator}
          onEditTask={onEditTask}
          onCompleteTask={onCompleteTask}
        />
      ))}
    </div>
  );
};

export default GroupTasksBoard;