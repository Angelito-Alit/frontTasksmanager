import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { groupService } from '../../services/api';

const PermissionsProvider = ({ 
  groupId, 
  children, 
  onCollaboratorsLoaded 
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkIfAdmin = async () => {
    try {
      const collaboratorsData = await groupService.getGroupCollaborators(groupId);

      const isUserAdmin = collaboratorsData.some(
        (collaborator) =>
          collaborator.userId._id.toString() === localStorage.getItem('userId') &&
          collaborator.role === 'admin'
      );

      setIsAdmin(isUserAdmin);
    } catch (error) {
      console.error('Error al verificar permisos de administrador:', error);
      message.error('Error al verificar permisos');
    }
  };

  const checkIfCollaborator = async () => {
    try {
      const collaboratorsData = await groupService.getGroupCollaborators(groupId);

      const isUserCollaborator = collaboratorsData.some(
        (collaborator) =>
          collaborator.userId._id.toString() === localStorage.getItem('userId')
      );

      setIsCollaborator(isUserCollaborator);
    } catch (error) {
      console.error('Error al verificar permisos de colaborador:', error);
      message.error('Error al verificar permisos');
    }
  };

  const fetchCollaborators = async () => {
    try {
      const collaboratorsData = await groupService.getGroupCollaborators(groupId);
      setCollaborators(collaboratorsData);
      if (onCollaboratorsLoaded) {
        onCollaboratorsLoaded(collaboratorsData);
      }
    } catch (error) {
      console.error('Error al obtener los colaboradores:', error);
      message.error('Error al obtener los colaboradores del grupo.');
    } finally {
      setLoading(false);
    }
  };

  const reloadPermissions = () => {
    setLoading(true);
    checkIfAdmin();
    checkIfCollaborator();
    fetchCollaborators();
  };

  useEffect(() => {
    reloadPermissions();
  }, [groupId]);

  return children({ 
    isAdmin, 
    isCollaborator, 
    collaborators, 
    loading,
    reloadPermissions
  });
};

export default PermissionsProvider;