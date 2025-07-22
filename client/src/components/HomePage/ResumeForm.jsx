import React, { useState } from 'react';
import axios from 'axios';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ResumeForm = ({ handleGenerate, loading, formSectionRef }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    address: '',
    skills: [],
    experience: [],
    education: [],
    references: [],
    customSummary: '',
  });
  const [skillText, setSkillText] = useState('');

  const isFormValid =
    formData.name?.trim() &&
    formData.role?.trim() &&
    formData.skills?.length > 0;

  const onSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && !loading) {
      handleGenerate(formData);
    }
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const addArrayItem = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], template] });
  };

  const removeArrayItem = (section, index) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData({ ...formData, [section]: updated });
  };

  const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('image', file);

  try {
    // Adjust the URL if your backend is on a different port
    const res = await axios.post('http://localhost:5000/api/resume/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setFormData((prev) => ({ ...prev, image: res.data.url }));
  } catch (err) {
    alert('Image upload failed');
  }
};

  return (
    <Paper
      elevation={6}
      sx={{ p: 4, borderRadius: 3, maxWidth: 800, mx: 'auto', mt: 6 }}
      ref={formSectionRef}
      component="form"
      onSubmit={onSubmit}
    >
      <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 3, textAlign: 'center' }}>
        Create Your Resume
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Basic Info */}
        <TextField label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} fullWidth required />
        <TextField label="Job Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} fullWidth required />
        <TextField label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} fullWidth />
        <TextField label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} fullWidth />
        <TextField label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} fullWidth />

        {/* Skills */}
        {/* <TextField
          label="Skills (comma separated)"
          value={Array.isArray(formData.skills) ? formData.skills.join(', ') : ''}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',') })}
          fullWidth
          required
        /> */}
       <TextField
          label="Skills (comma separated)"
          value={skillText}
          onChange={(e) => {
            const raw = e.target.value;
            setSkillText(raw);
            setFormData({
              ...formData,
              skills: raw.split(',').map((s) => s.trim()).filter(Boolean),
            });
          }}
          fullWidth
          required
        />


        {/* Experience */}
        <Typography variant="h6">Experience</Typography>
        {formData.experience.map((exp, i) => (
          <Box key={i} sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <TextField label="Position" value={exp.position} onChange={(e) => handleArrayChange('experience', i, 'position', e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="Company" value={exp.company} onChange={(e) => handleArrayChange('experience', i, 'company', e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="Location" value={exp.location} onChange={(e) => handleArrayChange('experience', i, 'location', e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="Dates" value={exp.dates} onChange={(e) => handleArrayChange('experience', i, 'dates', e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="Responsibilities (comma separated)" value={exp.responsibilities?.join(', ') || ''} onChange={(e) => handleArrayChange('experience', i, 'responsibilities', e.target.value.split(','))} fullWidth />
            <IconButton color="error" onClick={() => removeArrayItem('experience', i)}><DeleteIcon /></IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => addArrayItem('experience', { position: '', company: '', location: '', dates: '', responsibilities: [] })}>
          Add Experience
        </Button>

        {/* Education */}
        <Typography variant="h6">Education</Typography>
        {formData.education.map((edu, i) => (
          <Box key={i} sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <TextField label="Degree" value={edu.degree} onChange={(e) => handleArrayChange('education', i, 'degree', e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="Institution" value={edu.institution} onChange={(e) => handleArrayChange('education', i, 'institution', e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="Location" value={edu.location} onChange={(e) => handleArrayChange('education', i, 'location', e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="Dates" value={edu.dates} onChange={(e) => handleArrayChange('education', i, 'dates', e.target.value)} fullWidth />
            <IconButton color="error" onClick={() => removeArrayItem('education', i)}><DeleteIcon /></IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => addArrayItem('education', { degree: '', institution: '', location: '', dates: '' })}>
          Add Education
        </Button>

        {/* References */}
        <Typography variant="h6">References</Typography>
        {formData.references.map((ref, i) => (
          <Box key={i} sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <TextField label="Name" value={ref.name} onChange={(e) => handleArrayChange('references', i, 'name', e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="Email" value={ref.email} onChange={(e) => handleArrayChange('references', i, 'email', e.target.value)} fullWidth sx={{ mb: 1 }} />
            <TextField label="Phone" value={ref.phone} onChange={(e) => handleArrayChange('references', i, 'phone', e.target.value)} fullWidth />
            <IconButton color="error" onClick={() => removeArrayItem('references', i)}><DeleteIcon /></IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => addArrayItem('references', { name: '', email: '', phone: '' })}>
          Add Reference
        </Button>

        {/* Optional Summary */}
        <TextField
          label="Custom Summary (optional)"
          multiline
          rows={3}
          value={formData.customSummary}
          onChange={(e) => setFormData({ ...formData, customSummary: e.target.value })}
          fullWidth
        />

        <Box>
          <Button
            variant="outlined"
            component="label"
            sx={{ mb: 2 }}
          >
            Upload Profile Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {formData.image && (
            <Box sx={{ mb: 2 }}>
              <img src={formData.image} alt="Profile Preview" style={{ width: 100, borderRadius: 8 }} />
            </Box>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          sx={{ mt: 2 }}
          disabled={!isFormValid || loading}
        >
          {loading ? 'Generating...' : 'Generate Resume'}
        </Button>
      </Box>
    </Paper>
  );
};

export default ResumeForm;
