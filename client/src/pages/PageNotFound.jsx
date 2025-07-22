import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageNotFoundSticker from '../assets/Templates/pageNotFound.jpg';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
        bgcolor: '#f9f9f9',
      }}
    >
      {/* 🧃 Sticker-style image */}
      <img
        src={PageNotFoundSticker}
        alt="404 Sticker"
        style={{ width: 300, marginBottom: 24 }}
      />

      <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Looks like this page wandered off. Let’s get you back on track!
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
