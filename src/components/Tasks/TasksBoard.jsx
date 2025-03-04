import React from 'react';
import TasksColumn from './TasksColumn';

const TasksBoard = ({ tasks, onEditTask }) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {});

  const statuses = ['pendiente', 'en progreso', 'completada'];

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {statuses.map((status) => (
        <TasksColumn
          key={status}
          title={status}
          tasks={groupedTasks[status] || []}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
};

export default TasksBoard;