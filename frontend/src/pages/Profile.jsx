// src/pages/Profile.js
import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Person, Envelope, Lock, Telephone, Pencil, Check, X } from 'react-bootstrap-icons';
import AppNavbar from '../components/Navbar';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    oldPassword: '',
    password: '',
    confirmPassword: ''
  });
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState({
    name: false,
    email: false,
    phone: false
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile');
        setUser(res.data);
        setForm({
          name: res.data.name || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
          password: '',
          confirmPassword: ''
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleEdit = (field) => {
    setEditing({ ...editing, [field]: !editing[field] });
  };

  const handleProfileUpdate = async (field) => {
    try {
      setLoading(true);
      const payload = { [field]: form[field] };
      await api.put('/profile', payload);
      setUser({ ...user, [field]: form[field] });
      setEditing({ ...editing, [field]: false });
      setMsg(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully.`);
      setTimeout(() => setMsg(null), 3000);
    } catch (err) {
      setError(`Failed to update ${field}.`);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        old_password: form.oldPassword,
        new_password: form.password
      };
      await api.put('/update-password', payload);
      setMsg('Password updated successfully.');
      setForm({ ...form, oldPassword: '', password: '', confirmPassword: '' });
      setTimeout(() => setMsg(null), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        <Card className="shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <h3 className="mb-3">Your Profile</h3>
              <div className="d-flex justify-content-center">
                <div className="bg-primary rounded-circle p-3 text-white">
                  <Person size={24} />
                </div>
              </div>
            </div>

            {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
            {msg && <Alert variant="success" dismissible onClose={() => setMsg('')}>{msg}</Alert>}

            <div className="mb-4">
              <h5 className="mb-3 border-bottom pb-2">Personal Information</h5>
              
              <Form.Group className="mb-3">
                <Form.Label className="d-flex align-items-center">
                  <Person className="me-2" /> Name
                </Form.Label>
                <div className="d-flex align-items-center">
                  {editing.name ? (
                    <>
                      <Form.Control
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="me-2"
                      />
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleProfileUpdate('name')}
                        disabled={loading}
                      >
                        {loading ? <Spinner size="sm" /> : <Check />}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="ms-1"
                        onClick={() => toggleEdit('name')}
                      >
                        <X />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex-grow-1">{user.name || 'Not set'}</div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => toggleEdit('name')}
                      >
                        <Pencil />
                      </Button>
                    </>
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="d-flex align-items-center">
                  <Envelope className="me-2" /> Email
                </Form.Label>
                <div className="d-flex align-items-center">
                  {editing.email ? (
                    <>
                      <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="me-2"
                      />
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleProfileUpdate('email')}
                        disabled={loading}
                      >
                        {loading ? <Spinner size="sm" /> : <Check />}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="ms-1"
                        onClick={() => toggleEdit('email')}
                      >
                        <X />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex-grow-1">{user.email || 'Not set'}</div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => toggleEdit('email')}
                      >
                        <Pencil />
                      </Button>
                    </>
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="d-flex align-items-center">
                  <Telephone className="me-2" /> Phone
                </Form.Label>
                <div className="d-flex align-items-center">
                  {editing.phone ? (
                    <>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="me-2"
                      />
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleProfileUpdate('phone')}
                        disabled={loading}
                      >
                        {loading ? <Spinner size="sm" /> : <Check />}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="ms-1"
                        onClick={() => toggleEdit('phone')}
                      >
                        <X />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex-grow-1">{user.phone || 'Not set'}</div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => toggleEdit('phone')}
                      >
                        <Pencil />
                      </Button>
                    </>
                  )}
                </div>
              </Form.Group>
            </div>

            <div>
              <h5 className="mb-3 border-bottom pb-2">Change Password</h5>
              <Form onSubmit={handlePasswordSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex align-items-center">
                <Lock className="me-2" /> Old Password
              </Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                placeholder="Enter old password"
                required
              />
            </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="d-flex align-items-center">
                  <Lock className="me-2" /> New Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="d-flex align-items-center">
                  <Lock className="me-2" /> Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? (
                  <Spinner as="span" animation="border" size="sm" />
                ) : (
                  'Update Password'
                )}
              </Button>
            </Form>

            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;