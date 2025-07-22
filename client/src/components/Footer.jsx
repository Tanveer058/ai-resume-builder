import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    sx={{
      py: 3,
      px: 2,
      mt: 6,
      bgcolor: '#f5f5f5',
      textAlign: 'center',
    }}
  >
    <Typography variant="body2" color="text.secondary">
      © {new Date().getFullYear()} ResumeForge. All rights reserved.
    </Typography>
    <Typography variant="caption" color="text.disabled">
      Built with MERN by Tanveer
    </Typography>
  </Box>
);

export default Footer;
