import React from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, message } from 'antd';
import moment from 'moment';
import { taskService } from '../../services/api';

const { Option } = Select;

const AddTaskModal = ({ visible, onCancel, onTaskAdded }) => {
  const handleAddTask = async (values) => {
    try {
      const formattedValues = {
        ...values,
        deadline: values.deadline ? values.deadline.toISOString() : null,
      };

      const response = await taskService.createTask(formattedValues);
      onTaskAdded(response.task);
      onCancel();
      message.success('Tarea agregada exitosamente.');
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
      message.error('Error al agregar la tarea.');
    }
  };

  return (
    <Modal
      title={<div style={{ color: '#D35400', fontSize: '18px' }}>Agregar Tarea Personal</div>}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={500}
      bodyStyle={{ padding: '20px' }}
    >
      <Form onFinish={handleAddTask} layout="vertical">
        <Form.Item
          name="name"
          label="Nombre"
          rules={[{ required: true, message: 'Por favor ingresa el nombre de la tarea' }]}
        >
          <Input placeholder="Nombre de la tarea" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Estado"
          rules={[{ required: true, message: 'Por favor selecciona el estado' }]}
        >
          <Select placeholder="Selecciona el estado">
            <Option value="pendiente">Pendiente</Option>
            <Option value="en progreso">En Progreso</Option>
            <Option value="completada">Completada</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Descripción"
        >
          <Input.TextArea placeholder="Descripción de la tarea" rows={4} />
        </Form.Item>

        <Form.Item
          name="deadline"
          label="Fecha Límite"
        >
          <DatePicker
            style={{ width: '100%' }}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate={(current) => current && current < moment().startOf('day')}
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="Categoría"
        >
          <Input placeholder="Categoría de la tarea" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            style={{ 
              background: '#E67E22', 
              borderColor: '#E67E22',
              fontWeight: 'bold',
              height: '40px',
              width: '150px'
            }}
          >
            Agregar Tarea
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;