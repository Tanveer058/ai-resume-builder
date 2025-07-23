import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const backendUrl = process.env.REACT_APP_API_URL || '';
      const res = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', res.data.user.email);
      navigate('/');
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: '100%' }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: 'linear-gradient(270deg, #1976d2, #8e24aa, #ff9800, #1976d2)',
            backgroundSize: '600% 600%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            animation: 'gradientMove 8s ease-in-out infinite',
            '@keyframes gradientMove': {
              '0%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
              '100%': { backgroundPosition: '0% 50%' },
            },
          }}
        >
          Welcome Back
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
          Log in to continue building your professional resume
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ borderRadius: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ borderRadius: 2 }}
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleLogin}
            sx={{
              mt: 1,
              py: 1.5,
              bgcolor: '#1976d2',
              '&:hover': { bgcolor: '#1565c0' },
            }}
          >
            Login
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" align="center">
          Don’t have an account?{' '}
          <Button variant="text" onClick={() => navigate('/signup')} sx={{ color: '#1976d2' }}>
            Sign Up
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
