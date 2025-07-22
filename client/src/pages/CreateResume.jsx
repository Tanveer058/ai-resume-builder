import React, { useRef, useState } from 'react';
import { Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ResumeForm from '../components/HomePage/ResumeForm';
import axios from 'axios';

const CreateResume = () => {
  const { state } = useLocation();
  const selectedTemplate = state?.template || 'template1';
  const formSectionRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/resume/generate', {
        data: formData,
      });

      await axios.post('http://localhost:5000/api/resume/save', {
        data: { ...formData, summary: res.data.summary },
        template: selectedTemplate,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      navigate('/preview', {
        state: {
          formData,
          summary: res.data.summary,
          template: selectedTemplate,
        },
      });
    } catch (err) {
      console.error('Generation failed:', err);
      alert('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <ResumeForm
        handleGenerate={handleGenerate}
        loading={loading}
        formSectionRef={formSectionRef}
      />
    </Container>
  );
};

export default CreateResume;
