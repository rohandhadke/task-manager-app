// src/components/Filters.js
import React from 'react';
import { ButtonGroup, Button, Stack, Badge } from 'react-bootstrap';
import { 
  FilterCircle, 
  ListTask, 
  Clock, 
  CheckCircle, 
  ExclamationTriangle,
  Exclamation,
  ArrowDown,
  Filter
} from 'react-bootstrap-icons';

const Filters = ({ setStatusFilter, setPriorityFilter, statusFilter, priorityFilter }) => {
  const statusOptions = [
    { value: '', label: 'All', icon: <Filter size={25} className="me-1" /> },
    { value: 'Todo', label: 'Todo', icon: <ListTask size={16} className="me-1" /> },
    { value: 'In Progress', label: 'In Progress', icon: <Clock size={14} className="me-1" /> },
    { value: 'Completed', label: 'Completed', icon: <CheckCircle size={14} className="me-1" /> }
  ];

  const priorityOptions = [
    { value: '', label: 'All', icon: <Filter size={25} className="me-1" /> },
    { value: 'Urgent', label: 'Urgent', icon: <ExclamationTriangle size={14} className="me-1" /> },
    { value: 'High', label: 'High', icon: <Exclamation size={20} className="me-2  " /> },
    { value: 'Medium', label: 'Medium', icon: <ArrowDown size={14} className="me-1" /> },
    { value: 'Low', label: 'Low', icon: <ArrowDown size={14} className="me-1" style={{ opacity: 0.6 }} /> }
  ];

  const getStatusVariant = (status) => {
    if (status === statusFilter) {
      return {
        'Todo': 'primary',
        'In Progress': 'warning',
        'Completed': 'success'
      }[status] || 'primary';
    }
    return 'outline-secondary';
  };

  const getPriorityVariant = (priority) => {
    if (priority === priorityFilter) {
      return {
        'Urgent': 'danger',
        'High': 'warning',
        'Medium': 'info',
        'Low': 'secondary'
      }[priority] || 'danger';
    }
    return 'outline-secondary';
  };

  return (
    <div className="mb-4">
      <Stack direction="horizontal" gap={3} className="flex-wrap align-items-center">
        <div className="d-flex align-items-center me-3">
          <FilterCircle size={18} className="me-2 text-muted" />
          <span className="fw-medium text-muted">Filters:</span>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <ButtonGroup className="flex-wrap">
            {statusOptions.map(({ value, label, icon }) => (
              <Button
                key={value || 'status-all'}
                variant={getStatusVariant(value)}
                onClick={() => setStatusFilter(value === statusFilter ? '' : value)}
                size="sm"
                className="d-flex align-items-center"
              >
                {icon}
                {label}
                {value === statusFilter && (
                  <Badge pill bg="light" text="dark" className="ms-1">✓</Badge>
                )}
              </Button>
            ))}
          </ButtonGroup>

          <ButtonGroup className="flex-wrap">
            {priorityOptions.map(({ value, label, icon }) => (
              <Button
                key={value || 'priority-all'}
                variant={getPriorityVariant(value)}
                onClick={() => setPriorityFilter(value === priorityFilter ? '' : value)}
                size="sm"
                className="d-flex align-items-center"
              >
                {icon}
                {label}
                {value === priorityFilter && (
                  <Badge pill bg="light" text="dark" className="ms-1">✓</Badge>
                )}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </Stack>

      {(statusFilter || priorityFilter) && (
        <div className="mt-2">
          <Button 
            variant="outline-danger" 
            size="sm" 
            onClick={() => {
              setStatusFilter('');
              setPriorityFilter('');
            }}
            className="d-flex align-items-center"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Filters;