// src/pages/Auth.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { 
  Container, 
  Card, 
  Form, 
  Button, 
  Alert, 
  Tabs, 
  Tab, 
  InputGroup,
  Spinner
} from 'react-bootstrap';
import { Envelope, Person, Lock, PersonFill } from 'react-bootstrap-icons';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [form, setForm] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (type) => {
    try {
      setError('');
      setIsLoading(true);
      
      if (type === 'login') {
        const params = new URLSearchParams();
        params.append('username', form.username);
        params.append('password', form.password);

        const response = await api.post('/login', params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        login(response.data.access_token);
        navigate('/');
      } else {
        await api.post('/register', {
          username: form.username,
          email: form.email,
          password: form.password,
          name: form.name,
        });
        setActiveTab('login');
        setError('Registration successful! Please login.');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 
        (activeTab === 'login' ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 56px)' }}>
      <Card className="shadow-sm" style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <PersonFill size={40} className="text-primary mb-2" />
            <h3 className="mb-2">{activeTab === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
            <p className="text-muted mb-0">
              {activeTab === 'login' 
                ? 'Sign in to continue to your account' 
                : 'Get started with your new account'}
            </p>
          </div>

          <Tabs 
            activeKey={activeTab} 
            onSelect={setActiveTab} 
            className="mb-4 border-bottom-0"
            variant="tabs"
          >
            <Tab eventKey="login" title="Login" className="border-0" />
            <Tab eventKey="signup" title="Sign Up" className="border-0" />
          </Tabs>

          {error && (
            <Alert 
              variant={error.includes('successful') ? 'success' : 'danger'} 
              dismissible 
              onClose={() => setError('')}
              className="mb-4"
            >
              {error}
            </Alert>
          )}

          <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(activeTab); }}>
            {activeTab === 'signup' && (
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light">
                    <Person className="text-secondary" />
                  </InputGroup.Text>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <Person className="text-secondary" />
                </InputGroup.Text>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="username"
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>

            {activeTab === 'signup' && (
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light">
                    <Envelope className="text-secondary" />
                  </InputGroup.Text>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            )}

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <Lock className="text-secondary" />
                </InputGroup.Text>
                <Form.Control
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  placeholder={activeTab === 'login' ? "Enter password" : "Create password"}
                  onChange={handleChange}
                  required
                />
                {/* <Button 
                  variant="outline-secondary" 
                  onClick={togglePasswordVisibility}
                  className="border-start-0"
                >
                  {passwordShown ? 'Hide' : 'Show'}
                </Button> */}
              </InputGroup>
              {activeTab === 'signup' && (
                <Form.Text className="text-muted">
                  Use 8+ characters with a mix of letters, numbers & symbols
                </Form.Text>
              )}
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mb-3 py-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  {activeTab === 'login' ? 'Logging in...' : 'Registering...'}
                </>
              ) : (
                activeTab === 'login' ? 'Login' : 'Sign Up'
              )}
            </Button>

            {/* {activeTab === 'login' && (
              <div className="text-center mt-3">
                <a href="#forgot-password" className="text-decoration-none small">
                  Forgot password?
                </a>
              </div>
            )} */}
          </Form>

          <div className="text-center mt-4 pt-3 border-top">
            <p className="text-muted mb-0 small">
              {activeTab === 'login' 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <Button 
                variant="link" 
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                className="p-0 align-baseline small"
              >
                {activeTab === 'login' ? 'Sign up' : 'Login'}
              </Button>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Auth;