import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Skeleton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit'; // NEW
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [editDialog, setEditDialog] = useState({ open: false, resume: null });
  const navigate = useNavigate();

  const fetchResumes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/resume/mine', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setResumes(res.data);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setResumes((prev) => prev.filter((r) => r._id !== id));
      toast.success('Resume deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete resume');
    }
  };

  const handleView = (resume) => {
    navigate('/preview', {
      state: {
        formData: resume.data,
        summary: resume.data?.summary || '',
        template: resume.template,
      }
    });
  };

  const handleEdit = (resume) => {
    setEditDialog({ open: true, resume });
  };

  const confirmEdit = () => {
    const resume = editDialog.resume;
    setEditDialog({ open: false, resume: null });
    toast.success('Proceeding to update resume...');
    setTimeout(() => {
      navigate('/update-resume', {
        state: {
          resumeId: resume._id,
          formData: resume.data,
          summary: resume.data?.summary || '',
          template: resume.template,
          isEdit: true,
        }
      });
    }, 500);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Toaster position="top-right" />
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        My Resumes
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="30%" height={16} sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Skeleton variant="circular" width={36} height={36} />
                  <Skeleton variant="circular" width={36} height={36} />
                  <Skeleton variant="circular" width={36} height={36} />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : resumes.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 4 }}>
          You haven’t generated any resumes yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {resumes.map((resume) => (
            <Grid item xs={12} sm={6} md={4} key={resume._id}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  {resume.data.name || 'Unnamed Resume'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Role: {resume.data.role || 'Not specified'}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  Template: {resume.template}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <IconButton color="primary" onClick={() => handleView(resume)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="success" onClick={() => setEditDialog({ open: true, resume })}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => setDeleteDialog({ open: true, id: resume._id })}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}>
        <DialogTitle>Delete Resume</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this resume? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: null })} color="primary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await handleDelete(deleteDialog.id);
              setDeleteDialog({ open: false, id: null });
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Confirmation Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, resume: null })}>
        <DialogTitle>Update Resume</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update this resume?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, resume: null })} color="primary">
            Cancel
          </Button>
          <Button
            onClick={confirmEdit}
            color="success"
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyResumes;
