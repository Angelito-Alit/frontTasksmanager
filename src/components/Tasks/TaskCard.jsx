import React from 'react';
import { Card, Button, Tag } from 'antd';

const TaskCard = ({ task, onEdit }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'No definida';
    return new Date(dateString).toLocaleString();
  };

  const getCategoryColor = (category) => {
    if (!category) return '';
    
    const categories = {
      'trabajo': 'blue',
      'personal': 'green',
      'estudios': 'purple',
      'hogar': 'cyan',
      'salud': 'red',
      'finanzas': 'gold',
    };
    
    return categories[category.toLowerCase()] || 'orange';
  };

  return (
    <Card 
      key={task._id}
      style={{ 
        marginBottom: '16px', 
        borderRadius: '8px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        borderLeft: task.status === 'completada' ? '4px solid #27AE60' : 
                  task.status === 'en progreso' ? '4px solid #3498DB' : 
                  '4px solid #F39C12'
      }}
      bodyStyle={{ padding: '16px' }}
    >
      <h4 style={{ 
        margin: '0 0 10px 0', 
        color: '#D35400', 
        fontSize: '16px',
        textDecoration: task.status === 'completada' ? 'line-through' : 'none'
      }}>
        {task.name}
      </h4>
      
      {task.description && (
        <p style={{ 
          margin: '0 0 12px 0',
          color: '#555',
          fontSize: '14px'
        }}>
          {task.description}
        </p>
      )}
      
      <div style={{ marginBottom: '10px' }}>
        {task.category && (
          <Tag color={getCategoryColor(task.category)}>
            {task.category}
          </Tag>
        )}
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '10px'
      }}>
        <span style={{ 
          fontSize: '12px', 
          color: '#777'
        }}>
          <strong>Fecha límite:</strong> {formatDate(task.deadline)}
        </span>
        
        <Button 
          style={{ 
            background: '#E67E22', 
            borderColor: '#E67E22',
            color: 'white'
          }} 
          size="small"
          onClick={() => onEdit(task)}
        >
          Editar
        </Button>
      </div>
    </Card>
  );
};

export default TaskCard;