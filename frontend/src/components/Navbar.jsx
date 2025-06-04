import React, { useContext } from 'react';
import { Navbar, Nav, Container, Dropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  PersonCircle, 
  LayoutTextSidebar, 
  BoxArrowRight,
  Gear,
  Bell,
  ListTask
} from 'react-bootstrap-icons';

const AppNavbar = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Navbar bg="white" expand="lg" className="border-bottom py-2 shadow-sm">
      <Container fluid="lg">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <ListTask size={24} className="me-2 text-primary" />
          <span className="fw-bold text-primary">TaskFlow</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
          <Nav.Link 
            as={NavLink} 
            to="/dashboard" 
            className={({ isActive }) => 
              `d-flex align-items-center px-3 ${isActive ? 'active' : ''}`
            }
          > 
            <LayoutTextSidebar size={18} className="me-1" />
            Dashboard
          </Nav.Link>

            
            <Dropdown align="end">
              <Dropdown.Toggle 
                variant="light" 
                id="dropdown-profile"
                className="d-flex align-items-center bg-transparent border-0"
              >
                {currentUser?.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt="Profile" 
                    className="rounded-circle me-2"
                    width="32"
                    height="32"
                  />
                ) : (
                  <PersonCircle size={24} className="text-secondary" />
                )}
                <span className="d-none d-lg-inline ms-1">
                  {currentUser?.name || 'Profile'}
                </span>
              </Dropdown.Toggle>
              
              <Dropdown.Menu className="shadow-sm border">
                <Dropdown.Item 
                  as={Link} 
                  to="/profile" 
                  className="d-flex align-items-center"
                >
                  <PersonCircle size={16} className="me-2" />
                  Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item 
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="d-flex align-items-center text-danger"
                >
                  <BoxArrowRight size={16} className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;