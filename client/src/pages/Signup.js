// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


// function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/signup', { email, password });
//       alert('Signup successful');
//       navigate('/login');
//     } catch (error) {
//       alert('Signup failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
//       <button onClick={handleSignup}>Signup</button>
//     </div>
//   );
// }

// export default Signup;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      alert('Signup successful');
      navigate('/login');
    } catch (error) {
      alert('Signup failed');
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
          Create Your Account
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
          Start building your professional resume today
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSignup}
            sx={{
              mt: 1,
              py: 1.5,
              bgcolor: '#1976d2',
              '&:hover': { bgcolor: '#1565c0' },
            }}
          >
            Sign Up
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" align="center">
          Already have an account?{' '}
          <Button variant="text" onClick={() => navigate('/login')} sx={{ color: '#1976d2' }}>
            Log In
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Signup;