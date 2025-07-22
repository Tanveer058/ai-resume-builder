import React from 'react';
import { Box, Button, Card, CardMedia, CardActionArea } from '@mui/material';

import { Typography } from '@mui/material';

const TemplateSelector = ({ templates, selected, setSelected, onUseTemplate }) => {
  return (
    <>
      <Box sx={{ width: '100%', position: 'relative', mb: { xs: 2, md: 4 }, mt: { xs: 4, md: 8 } }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          align="center"
          sx={{ position: 'relative', mb: 0 }}
        >
          Choose your template to use in your resume
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 4 },
          justifyContent: 'center',
          alignItems: 'stretch',
          mt: 2,
          width: '100%',
          maxWidth: '100vw',
          px: { xs: 1, sm: 2, md: 4 },
        }}
      >
        {templates.map((template) => (
          <Card
            key={template.name}
            elevation={selected === template.name ? 6 : 2}
            sx={{
              position: 'relative',
              border: selected === template.name ? '2px solid #1976d2' : 'none',
              cursor: 'pointer',
              flex: 1,
              minWidth: { xs: '90vw', sm: 320, md: 0 },
              maxWidth: { xs: '100vw', md: 'none' },
              display: 'flex',
              flexDirection: 'column',
              transition: 'box-shadow 0.3s',
              mb: { xs: 2, md: 0 },
              '&:hover .hover-button': {
                opacity: 1,
                transform: 'translate(-50%, -10%)',
              },
            }}
            onClick={() => setSelected(template.name)}
          >
            <CardActionArea sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={template.image}
                alt={template.name}
                sx={{
                  width: '100%',
                  height: { xs: 220, sm: 320, md: 400 },
                  objectFit: 'contain',
                  background: '#f8f8f8',
                  flex: 1,
                }}
              />
            </CardActionArea>

            <Button
              className="hover-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent onClick
                onUseTemplate(template.name);
              }}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, 0%)',
                opacity: 0,
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                zIndex: 2,
                width: { xs: '80%', sm: 'auto' },
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              Use This Template
            </Button>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default TemplateSelector;
