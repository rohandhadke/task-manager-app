import React, { useEffect, useState, useCallback } from 'react';
import AppNavbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import TaskModal from '../components/TaskModal';
import TaskCard from '../components/TaskCard';
import api from '../utils/api';
import { Container, Row, Col, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { PlusCircle, Funnel, FunnelFill } from 'react-bootstrap-icons';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [editingTask, setEditingTask] = useState(null);
  


  // Memoized task fetching
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter and sort tasks
  useEffect(() => {
    let count = 0;
    let data = [...tasks];
    
    if (search) {
      data = data.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (statusFilter) {
      data = data.filter(task => task.status.toLowerCase() === statusFilter.toLowerCase());
      count++;
    }

    if (priorityFilter) {
      data = data.filter(task => task.priority.toLowerCase() === priorityFilter.toLowerCase());
      count++;
    }
    
    // Sort: completed at bottom, then by priority (Urgent first)
    data.sort((a, b) => {
      // Sort by created_at descending (newest first)
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;

      // Then push completed to the bottom
      if (a.status.toLowerCase() === 'completed' && b.status.toLowerCase() !== 'completed') return 1;
      if (a.status.toLowerCase() !== 'completed' && b.status.toLowerCase() === 'completed') return -1;

      // Then sort by priority
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority.toLowerCase()] - priorityOrder[b.priority.toLowerCase()];
    });

    
    setFilteredTasks(data);
    setActiveFiltersCount(count);
  }, [search, statusFilter, priorityFilter, tasks]);

  // Initial data load
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const clearAllFilters = () => {
    setSearch('');
    setStatusFilter('');
    setPriorityFilter('');
  };

  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h4 mb-0">Task Manager</h1>
          <Button 
            variant="primary" 
            onClick={() => {
              setEditingTask(null); // Explicitly reset editing task
              setShowModal(true);
            }}
            className="d-flex align-items-center"
          >
            <PlusCircle size={18} className="me-1" />
            New Task
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-light p-3 rounded-3 mb-4 shadow-sm">
          <div className="d-flex flex-column flex-md-row gap-3 m-3">
            <div className="flex-grow-1">
              <SearchBar 
                search={search} 
                setSearch={setSearch} 
                placeholder="Search tasks..." 
              />
            </div>
          </div>

          <Filters
            setStatusFilter={setStatusFilter}
            setPriorityFilter={setPriorityFilter}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
          />
        </div>

        {/* Content Section */}
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-2 text-muted">Loading tasks...</p>
          </div>
        ) : (
          <>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-5 bg-light rounded-3">
                <FunnelFill size={48} className="text-muted mb-3" />
                <h5 className="mb-2">No tasks found</h5>
                <p className="text-muted mb-3">
                  {search || statusFilter || priorityFilter 
                    ? 'Try adjusting your filters or search' 
                    : 'Create your first task to get started'}
                </p>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => {
                    if (search || statusFilter || priorityFilter) {
                      clearAllFilters();
                    } else {
                      setShowModal(true);
                    }
                  }}
                >
                  {search || statusFilter || priorityFilter 
                    ? 'Clear all filters' 
                    : 'Create Task'}
                </Button>
              </div>
            ) : (
              <Row className="g-4">
                {filteredTasks.map(task => (
                  <Col key={task.id} xs={12} sm={6} lg={4} xl={3}>
                    <TaskCard 
                      task={task} 
                      refresh={fetchTasks} 
                      onEdit={(task) => {
                        setEditingTask(task);
                        setShowModal(true);
                      }} 
                    />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}

        {/* Task Modal */}
        <TaskModal 
          show={showModal} 
          handleClose={() => setShowModal(false)} 
          refresh={fetchTasks} 
          task={editingTask}
        />
      </Container>
    </>
  );
};

export default Home;