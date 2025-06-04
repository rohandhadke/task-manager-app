// src/components/TaskModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import api from '../utils/api';

const TaskModal = ({ show, handleClose, refresh, task }) => {
const [form, setForm] = useState({
  title: '',
  description: '',
  deadline: '',
  status: 'todo',     // lowercase
  priority: 'medium', // lowercase
});

useEffect(() => {
  if (task) {
    setForm({
      title: task.title,
      description: task.description,
      deadline: task.deadline ? task.deadline.split('T')[0] : '',
      status: task.status.toLowerCase(), // ensure lowercase
      priority: task.priority.toLowerCase(), // ensure lowercase
    });
  } else {
    // Reset form for new task
    setForm({
      title: '',
      description: '',
      deadline: '',
      status: 'todo',
      priority: 'medium',
    });
  }
}, [task, show]); // Add show to dependency array to reset when modal opens

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const deadline = form.deadline ? new Date(form.deadline).toISOString() : null;
      const payload = { ...form, deadline };

      if (task) {
        await api.put(`/tasks/update/${task.id}`, payload);
      } else {
        await api.post('/tasks', payload);
      }

      refresh();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'New Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={form.description}
              onChange={handleChange}
              as="textarea"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              type="date"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={form.status} onChange={handleChange}>
              <option value="todo">Todo</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>

          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select name="priority" value={form.priority} onChange={handleChange}>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Form.Select>

          </Form.Group>
          <Button onClick={handleSubmit}>
            {task ? 'Update Task' : 'Create Task'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskModal;