import React from 'react';
import { Card } from 'antd';
import GroupTaskCard from './GroupTaskCard';

const GroupTasksColumn = ({ 
  title, 
  tasks, 
  isAdmin, 
  isCollaborator, 
  onEditTask, 
  onCompleteTask 
}) => {
  return (
    <Card
      title={title.toUpperCase()}
      style={{ flex: 1, background: '#f0f2f5' }}
    >
      {tasks?.map((task) => (
        <GroupTaskCard
          key={task._id}
          task={task}
          isAdmin={isAdmin}
          isCollaborator={isCollaborator}
          onEdit={onEditTask}
          onComplete={onCompleteTask}
        />
      ))}
    </Card>
  );
};

export default GroupTasksColumn;