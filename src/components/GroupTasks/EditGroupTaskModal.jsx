import React, { useEffect } from 'react';
import { Modal, Form, Select, Button, message, Descriptions } from 'antd';
import moment from 'moment';
import { groupService } from '../../services/api';

const { Option } = Select;

const EditGroupTaskModal = ({
  visible,
  onCancel,
  groupId,
  task,
  collaborators,
  onTaskUpdated
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        status: task.status
      });
    }
  }, [task, form]);

  const handleUpdateTask = async (values) => {
    try {
      // Solo enviamos el campo status para actualizar
      const response = await groupService.updateGroupTask(groupId, task._id, {
        status: values.status
      });
      
      onTaskUpdated(response.task);
      onCancel();
      message.success('Estado de la tarea actualizado exitosamente.');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      message.error('Error al actualizar el estado de la tarea.');
    }
  };

  return (
    <Modal
      title="Actualizar Estado de Tarea"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Descriptions bordered column={1} style={{ marginBottom: 24 }}>
        <Descriptions.Item label="Nombre">{task?.name}</Descriptions.Item>
        <Descriptions.Item label="Descripción">{task?.description || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Fecha Límite">
          {task?.deadline ? moment(task.deadline).format('YYYY-MM-DD HH:mm') : 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Categoría">{task?.category || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Asignado a">
          {task?.assignedTo?.username || 'N/A'}
        </Descriptions.Item>
      </Descriptions>
      <Form form={form} onFinish={handleUpdateTask} layout="vertical">
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

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            style={{ background: '#E67E22', borderColor: '#E67E22' }}
          >
            Actualizar Estado
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditGroupTaskModal;