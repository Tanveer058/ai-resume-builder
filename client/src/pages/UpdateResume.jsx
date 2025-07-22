import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material';

const UpdateResume = () => {
  const { resumeId, formData, template } = useLocation().state;
  const [updatedForm, setUpdatedForm] = useState(formData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/resume/${resumeId}`, {
        data: updatedForm,
        template
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Resume updated successfully!');
      navigate('/my-resumes');
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Update Your Resume
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Full Name" value={updatedForm.name} onChange={(e) => setUpdatedForm({ ...updatedForm, name: e.target.value })} fullWidth />
          <TextField label="Role" value={updatedForm.role} onChange={(e) => setUpdatedForm({ ...updatedForm, role: e.target.value })} fullWidth />
          <TextField label="Experience" multiline rows={4} value={updatedForm.experience} onChange={(e) => setUpdatedForm({ ...updatedForm, experience: e.target.value })} fullWidth />
          <TextField label="Skills (comma separated)" value={Array.isArray(updatedForm.skills) ? updatedForm.skills.join(', ') : updatedForm.skills} onChange={(e) => setUpdatedForm({ ...updatedForm, skills: e.target.value.split(',') })} fullWidth />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            {loading ? 'Updating...' : 'Update Resume'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UpdateResume;
