import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { userService } from '../../services/api';

const { Option } = Select;

const EditUserModal = ({ visible, onCancel, user }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        role: user.role || 'user'
      });
    }
  }, [user, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await userService.updateUser(user._id, values);
      message.success('Usuario actualizado con éxito');
      onCancel(false); // Cerrar el modal después de guardar exitosamente
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      message.error('Error al actualizar el usuario');
    }
  };

  return (
    <Modal
      title="Editar Usuario"
      open={visible}
      onOk={handleSave}
      onCancel={() => onCancel(false)}
      okText="Guardar"
      cancelText="Cancelar"
      okButtonProps={{ style: { background: '#E67E22', borderColor: '#E67E22' } }}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Nombre de usuario"
          rules={[{ required: true, message: 'Por favor ingresa un nombre de usuario' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Por favor ingresa un email' },
            { type: 'email', message: 'Por favor ingresa un email válido' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Rol"
          rules={[{ required: true, message: 'Por favor selecciona un rol' }]}
        >
          <Select>
            <Option value="user">Usuario</Option>
            <Option value="master">Administrador</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;