import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, message } from 'antd';
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
        ...task,
        deadline: task.deadline ? moment(task.deadline) : null,
      });
    }
  }, [task, form]);

  const handleUpdateTask = async (values) => {
    try {
      const formattedValues = {
        ...values,
        deadline: values.deadline ? values.deadline.toISOString() : null,
      };

      const response = await groupService.updateGroupTask(groupId, task._id, formattedValues);
      onTaskUpdated(response.task);
      onCancel();
      form.resetFields();
      message.success('Tarea actualizada exitosamente.');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      message.error('Error al actualizar la tarea.');
    }
  };

  return (
    <Modal
      title="Editar Tarea"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleUpdateTask} layout="vertical">
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
          <Input.TextArea placeholder="Descripción de la tarea" />
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

        <Form.Item
          name="assignedTo"
          label="Asignar a"
        >
          <Select placeholder="Selecciona un colaborador">
            {collaborators.map((collaborator) => (
              <Option key={collaborator.userId._id} value={collaborator.userId._id}>
                {collaborator.userId.username}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ background: '#E67E22', borderColor: '#E67E22' }}>
            Actualizar Tarea
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditGroupTaskModal;