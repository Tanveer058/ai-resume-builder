import React, { useState, useRef } from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import HeroSection from '../components/HomePage/HeroSection';
import TemplateSelector from '../components/HomePage/TemplateCard';

import template1Img from '../assets/Templates/template1.png';
import template2Img from '../assets/Templates/template2.png';
import template3Img from '../assets/Templates/template3.png';

const Home = () => {
  const [template, setTemplate] = useState('template1');
  const navigate = useNavigate();
  const templateSectionRef = useRef(null);

  const templates = [
    { name: 'template1', image: template1Img },
    { name: 'template2', image: template2Img },
    { name: 'template3', image: template3Img },
  ];

  const scrollToTemplates = () => {
    templateSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTemplateUse = (selectedTemplate) => {
    navigate('/create-resume', {
      state: { template: selectedTemplate }
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <HeroSection scrollToForm={scrollToTemplates} />

      <div ref={templateSectionRef}>
        <TemplateSelector
          templates={templates}
          selected={template}
          setSelected={setTemplate}
          onUseTemplate={handleTemplateUse}
        />
      </div>
    </Container>
  );
};

export default Home;
