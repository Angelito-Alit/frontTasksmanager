import React from 'react';
import { Card } from 'antd';
import TaskCard from './TaskCard';

const TasksColumn = ({ title, tasks, onEditTask }) => {
  return (
    <Card
      title={title.toUpperCase()}
      style={{ flex: 1, background: '#f0f2f5' }}
    >
      {tasks?.map((task) => (
        <TaskCard 
          key={task._id} 
          task={task} 
          onEdit={onEditTask} 
        />
      ))}
    </Card>
  );
};

export default TasksColumn;