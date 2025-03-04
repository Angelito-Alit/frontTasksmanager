import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { groupService } from '../../services/api';

const AddCollaboratorModal = ({ visible, onCancel, groupId, onCollaboratorAdded }) => {
  const [form] = Form.useForm();

  const handleAddCollaborator = async (values) => {
    try {
      await groupService.addGroupCollaborator(groupId, values.email);
      message.success('Colaborador agregado exitosamente.');
      onCollaboratorAdded();
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('Error al agregar colaborador:', error);
      message.error('Error al agregar colaborador.');
    }
  };

  return (
    <Modal
      title="Agregar Colaborador"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleAddCollaborator} layout="vertical">
        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[
            { required: true, message: 'Por favor ingresa el correo electrónico' },
            { type: 'email', message: 'Por favor ingresa un correo electrónico válido' }
          ]}
        >
          <Input placeholder="Correo electrónico del colaborador" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ background: '#E67E22', borderColor: '#E67E22' }}>
            Agregar Colaborador
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCollaboratorModal;