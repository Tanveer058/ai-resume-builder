import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          About ResumeForge
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          ResumeForge is a modern resume builder developed by Tanveer, a MERN stack developer at
          <strong> iCreativez Technologies Nawabshah branch</strong>. Under the guidance of team lead
          <strong> Muhammad Kamran</strong>, this project reflects our commitment to building practical,
          user-centric applications that solve real-world problems.
        </Typography>

        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          About iCreativez Technologies
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>iCreativez Technologies</strong> is an award-winning IT outsourcing company based in Pakistan,
          with a global footprint across 18+ countries. With over a decade of excellence, iCreativez delivers
          high-impact digital solutions including:
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          <li>Custom Web & Mobile App Development</li>
          <li>Enterprise Software Solutions</li>
          <li>SEO & Conversion Optimization</li>
          <li>UI/UX Design & Content Strategy</li>
          <li>eCommerce & Digital Marketing</li>
          <li>Cloud & IT Consulting Services</li>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          The Nawabshah branch, located at the Software Technology Park in QUEST University, plays a vital role
          in bridging academic excellence with industry innovation. Our team is passionate about building scalable,
          secure, and intelligent software that empowers users and businesses alike.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Learn more at <a href="https://www.icreativez.com" target="_blank" rel="noopener noreferrer">www.icreativez.com</a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
