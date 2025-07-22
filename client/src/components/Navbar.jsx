import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Modal,
  Avatar,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [resumeCount, setResumeCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = localStorage.getItem('email');
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/resume/mine', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setResumeCount(res.data.length);
      } catch (err) {
        console.error('Resume count error:', err);
      }
    };

    fetchCount();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = '/login';
  };

  // Helper for underline animation
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'My Resumes', path: '/my-resumes' },
  ];

  return (
    <>
      <style>{`
        .nav-underline {
          position: relative;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 6px 8px;
          font: inherit;
          outline: none;
        }
        .nav-underline .underline {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #1976d2;
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(.4,0,.2,1);
          transform-origin: left;
        }
        .nav-underline:hover .underline,
        .nav-underline.active .underline {
          transform: scaleX(1);
        }
      `}</style>
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            color="primary"
            fontWeight="bold"
            sx={{ cursor: 'pointer', fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}
            onClick={() => navigate('/')}
          >
            ResumeForge
          </Typography>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            {navLinks.map((link) => (
              <button
                key={link.path}
                className={`nav-underline${location.pathname === link.path ? ' active' : ''}`}
                onClick={() => navigate(link.path)}
                style={{
                  color: location.pathname === link.path ? '#1976d2' : 'inherit',
                  fontWeight: location.pathname === link.path ? 700 : 500,
                  background: 'none',
                  border: 'none',
                  position: 'relative',
                  fontSize: '1rem',
                  marginRight: link.label === 'My Resumes' ? 0 : 8,
                  display: 'flex',
                  alignItems: 'center',
                  paddingBottom: 2,
                }}
              >
                {link.label}
                {link.label === 'My Resumes' && (
                  <Badge badgeContent={resumeCount} color="primary" sx={{ marginLeft: '15px' }} />
                )}
                <span className="underline" />
              </button>
            ))}
            <IconButton color="primary" onClick={() => setOpen(true)}>
              <AccountCircleIcon />
            </IconButton>
          </Box>

          {/* Mobile Nav */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton color="primary" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <IconButton color="primary" onClick={() => setOpen(true)}>
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton onClick={() => navigate(link.path)} selected={location.pathname === link.path}>
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      color: location.pathname === link.path ? 'primary' : 'inherit',
                      fontWeight: location.pathname === link.path ? 700 : 500,
                    }}
                  />
                  {link.label === 'My Resumes' && (
                    <Badge badgeContent={resumeCount} color="primary" sx={{ marginLeft: '10px' }} />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpen(true)}>
                <ListItemIcon>
                  <AccountCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Spacer to prevent content from being hidden behind the fixed navbar */}
      <Toolbar />

      {/*Profile Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4,
            width: 300,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Avatar sx={{ width: 60, height: 60, mb: 2 }}>
            <AccountCircleIcon fontSize="large" />
          </Avatar>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {userEmail || 'user@example.com'}
          </Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
