import { Box, Typography, Button } from '@mui/material';
import HeroSectionImg from '../../assets/heroSectionImage.png';

const HeroSection = ({ scrollToForm }) => (
  <Box
  textAlign="center"
  sx={{
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    px: { xs: 2, sm: 4 },
    pt: { xs: 4, sm: 6 },
    pb: { xs: 3, sm: 4 },
  }}
>

    {/* Sticker/Label Image */}
    <Box
      sx={{
        position: 'absolute',
        top: { xs: 24, sm: 32 },
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        width: { xs: 160, sm: 200, md: 260 },
      }}
    >
      <img
        src={HeroSectionImg}
        alt="Resume Builder Sticker"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </Box>

    {/* Headline */}
    <Typography
      variant="h3"
      fontWeight="bold"
      gutterBottom
      sx={{
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        mt: { xs: 12, sm: 14, md: 18 },
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
      Create a Resume to Land Your Dream Job
    </Typography>

    {/* Description */}
    <Typography
      variant="body1"
      sx={{
        mb: 3,
        maxWidth: 600,
        mx: 'auto',
        fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
      }}
    >
      Our resume builder combines modern templates, recruiter insights, and AI-generated content
      to help you craft a professional resume in minutes.
    </Typography>

    {/* CTA Button */}
    <Button
      variant="contained"
      size="large"
      onClick={scrollToForm}
      sx={{
        px: { xs: 3, sm: 5 },
        py: { xs: 1.5, sm: 2 },
        fontSize: { xs: '0.9rem', sm: '1rem' },
      }}
    >
      Start Building
    </Button>
  </Box>
);

export default HeroSection;
