import React, { useState, useEffect } from 'react';
import { List, Card, Button, Modal, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { groupService } from '../../services/api';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const data = await groupService.getGroups();
      setGroups(data);
    } catch (error) {
      console.error('Error al obtener los grupos:', error);
      message.error('Error al cargar los grupos.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (values) => {
    try {
      setLoading(true);
      const response = await groupService.createGroup(values);
      setGroups([...groups, response.group]);
      setIsModalVisible(false);
      form.resetFields();
      message.success('Grupo creado exitosamente.');
    } catch (error) {
      console.error('Error al crear el grupo:', error);
      message.error('Error al crear el grupo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#D35400' }}>Grupos</h1>

      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ background: '#E67E22', marginBottom: '16px' }}
        loading={loading}
      >
        Crear Grupo
      </Button>

      <List
        loading={loading}
        grid={{ gutter: 16, column: 4 }}
        dataSource={groups}
        renderItem={(group) => {
          if (!group.groupId) {
            return null; 
          }

          return (
            <List.Item key={group.groupId._id}>
              <Link to={`/groupTasks/${group.groupId._id}`}>
                <Card title={group.groupId.name}>
                  <p>Administrador: {group.groupId.admin.username}</p>
                </Card>
              </Link>
            </List.Item>
          );
        }}
      />

      <Modal
        title="Crear Grupo"
        open={isModalVisible} 
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateGroup} layout="vertical">
          <Form.Item
            name="name"
            label="Nombre del Grupo"
            rules={[{ required: true, message: 'Por favor ingresa el nombre del grupo' }]}
          >
            <Input placeholder="Nombre del grupo" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{ background: '#E67E22', borderColor: '#E67E22' }}
            >
              Crear Grupo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GroupsPage;