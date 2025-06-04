// src/components/TaskCard.js
import React, { useState } from 'react';
import { Card, Dropdown, Badge, ButtonGroup, Button, Modal } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import TaskModal from './TaskModal';
import api from '../utils/api';

const priorityColors = {
  Urgent: 'danger',
  High: 'warning',
  Medium: 'info',
  Low: 'secondary',
};

const TaskCard = ({ task, refresh }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updateStatus = async (status) => {
    try {
      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline,
        status: status.toLowerCase(), // ensure lowercase for backend
      });
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/tasks/${task.id}`);
      refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>
            {task.title}{' '}
            <Badge
              bg={
                priorityColors[
                  task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1).toLowerCase()
                ] || 'secondary'
              }
            >
              {task.priority}
            </Badge>          
            </Card.Title>
          <Card.Text>{task.description}</Card.Text>
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <small className="text-muted">
                Added: {new Date(task.created_at).toLocaleString()}
              </small><br />
              {task.deadline && (
                <small className="text-danger">
                  Deadline: {new Date(task.deadline).toLocaleDateString()}
                </small>
              )}
            </div>
            <ButtonGroup size="sm">
              <Button variant="outline-primary" onClick={() => setShowEditModal(true)}>
                <PencilSquare />
              </Button>
              <Button variant="outline-danger" onClick={() => setShowDeleteModal(true)}>
                <Trash />
              </Button>
            </ButtonGroup>
          </div>
          <Dropdown className="mt-2">
            <Dropdown.Toggle variant="light" size="sm">
              Status: {task.status}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {['Todo', 'In Progress', 'Completed'].map((status) => (
                <Dropdown.Item key={status} onClick={() => updateStatus(status)}>
                  {status}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the task "{task.title}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Task Modal */}
      <TaskModal 
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        refresh={refresh}
        task={task}
      />
    </>
  );
};

export default TaskCard;