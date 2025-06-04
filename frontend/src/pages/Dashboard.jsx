// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import AppNavbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import api from '../utils/api';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const stats = {
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status !== 'completed').length,
    urgent: tasks.filter(t => ['urgent', 'high'].includes(t.priority)).length,
  };

  return (
    <>
      <AppNavbar />
      <Container>
        <h3 className="mb-4">Dashboard</h3>
        <Row className="mb-4">
          <Col md={4}>
            <Card bg="success" text="white" className="text-center p-3">
              <h5>Completed</h5>
              <h2>{stats.completed}</h2>
            </Card>
          </Col>
          <Col md={4}>
            <Card bg="warning" text="dark" className="text-center p-3">
              <h5>Pending</h5>
              <h2>{stats.pending}</h2>
            </Card>
          </Col>
          <Col md={4}>
            <Card bg="danger" text="white" className="text-center p-3">
              <h5>High/Urgent Priority</h5>
              <h2>{stats.urgent}</h2>
            </Card>
          </Col>
        </Row>

        <h5>All Tasks</h5>
        {loading ? (
          <div className="text-center py-5"><Spinner animation="border" /></div>
        ) : (
          <Row className="g-3">
            {tasks.map(task => (
              <Col key={task.id} md={6} lg={4}>
                <TaskCard task={task} refresh={fetchTasks} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
