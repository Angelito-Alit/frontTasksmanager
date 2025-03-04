import React from 'react';
import { Card, Button } from 'antd';

const GroupTaskCard = ({ 
  task, 
  isAdmin, 
  isCollaborator, 
  onEdit, 
  onComplete 
}) => {
  return (
    <Card
      key={task._id}
      style={{ marginBottom: '8px' }}
    >
      <h4>{task.name}</h4>
      <p>{task.description}</p>
      <p><strong>Categoría:</strong> {task.category}</p>
      <p><strong>Fecha límite:</strong> {new Date(task.deadline).toLocaleString()}</p>
      <p><strong>Asignado a:</strong> {task.assignedTo?.username || 'Sin asignar'}</p>
      <p><strong>Creada por:</strong> {task.createdBy?.username}</p>
      
      {isAdmin && (
        <Button
          style={{ background: '#E67E22', borderColor: '#E67E22', marginRight: '8px' }}
          onClick={() => onEdit(task)}
        >
          Editar
        </Button>
      )}
      
      {isCollaborator && task.status !== 'completada' && (
        <Button
          type="primary"
          style={{ background: '#E67E22', borderColor: '#E67E22', marginRight: '8px' }}
          onClick={() => onComplete(task._id)}
        >
          Completar
        </Button>
      )}
    </Card>
  );
};

export default GroupTaskCard;