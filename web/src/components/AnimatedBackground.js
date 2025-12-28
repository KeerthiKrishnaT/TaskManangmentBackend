import React from 'react';
import { Box } from '@mui/material';

const AnimatedBackground = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: '#1a237e', // Deep blue background
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 214, 0, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 214, 0, 0.1) 0%, transparent 50%)
          `,
        },
      }}
    >
      {/* Top Left - Semi-circle and Rectangle */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          width: '120px',
          height: '120px',
          borderRadius: '0 0 120px 0',
          backgroundColor: '#0d47a1',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '8%',
          left: '12%',
          width: '80px',
          height: '60px',
          backgroundColor: '#ffd600',
          animation: 'floatReverse 8s ease-in-out infinite 1s',
        }}
      />

      {/* Top Right - Triangle and Rectangle */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '8%',
          width: 0,
          height: 0,
          borderLeft: '60px solid transparent',
          borderRight: '60px solid transparent',
          borderBottom: '100px solid #0d47a1',
          animation: 'float 7s ease-in-out infinite 0.5s',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          width: '90px',
          height: '70px',
          backgroundColor: '#ffd600',
          borderRadius: '8px',
          animation: 'floatReverse 9s ease-in-out infinite 1.5s',
        }}
      />

      {/* Bottom Left - Dot Grid and Rectangle */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '8%',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          width: '100px',
          height: '100px',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      >
        {[...Array(16)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ffd600',
            }}
          />
        ))}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '12%',
          left: '18%',
          width: '70px',
          height: '85px',
          backgroundColor: '#0d47a1',
          borderRadius: '12px',
          animation: 'float 6.5s ease-in-out infinite 2s',
        }}
      />

      {/* Bottom Right - Semi-circle and Rectangle */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '8%',
          right: '6%',
          width: '110px',
          height: '110px',
          borderRadius: '120px 0 0 0',
          backgroundColor: '#0d47a1',
          animation: 'floatReverse 8.5s ease-in-out infinite 0.8s',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '12%',
          width: '75px',
          height: '65px',
          backgroundColor: '#ffd600',
          borderRadius: '10px',
          animation: 'float 7.5s ease-in-out infinite 1.2s',
        }}
      />

      {/* Center - Additional floating elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '15%',
          width: '50px',
          height: '50px',
          backgroundColor: '#ffd600',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite 2.5s',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '45%',
          right: '20%',
          width: '60px',
          height: '60px',
          backgroundColor: '#0d47a1',
          borderRadius: '50%',
          animation: 'floatReverse 9s ease-in-out infinite 1.8s',
        }}
      />

      {/* Additional geometric shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          width: '40px',
          height: '40px',
          backgroundColor: '#ffd600',
          transform: 'rotate(45deg)',
          animation: 'rotate 15s linear infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          right: '30%',
          width: '55px',
          height: '55px',
          backgroundColor: '#0d47a1',
          transform: 'rotate(45deg)',
          borderRadius: '8px',
          animation: 'rotate 20s linear infinite reverse',
        }}
      />
    </Box>
  );
};

export default AnimatedBackground;
