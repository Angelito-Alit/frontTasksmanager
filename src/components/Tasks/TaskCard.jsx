import React from 'react';
import { Card, Button } from 'antd';

const TaskCard = ({ task, onEdit }) => {
  return (
    <Card 
      key={task._id}
      style={{ marginBottom: '8px' }}
    >
      <h4>{task.name}</h4>
      <p>{task.description}</p>
      <p><strong>Categoría:</strong> {task.category}</p>
      <p><strong>Fecha límite:</strong> {new Date(task.deadline).toLocaleString()}</p>
      <Button 
        style={{ background: '#E67E22', borderColor: '#E67E22' }} 
        onClick={() => onEdit(task)}
      >
        Editar
      </Button>
    </Card>
  );
};

export default TaskCard;