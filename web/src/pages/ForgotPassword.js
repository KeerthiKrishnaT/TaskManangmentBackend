import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { authAPI } from '../services/api';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import AnimatedBackground from '../components/AnimatedBackground';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !securityAnswer) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.forgotPassword({ email, securityAnswer });
      
      if (response.data.success) {
        // In production, the link would be sent via email
        // For now, we'll show the link in a toast and copy it
        const resetUrl = response.data.data.resetUrl;
        toast.success('Password reset link generated! Check your email or use the link below.');
        
        // Copy to clipboard if possible
        if (navigator.clipboard) {
          navigator.clipboard.writeText(resetUrl);
          toast.success('Reset link copied to clipboard!');
        }
        
        // Show the link (in production, this would be sent via email)
        console.log('Reset URL:', resetUrl);
        
        // Navigate to reset page with token
        const token = response.data.data.resetToken;
        navigate(`/reset-password/${token}`);
      }
    } catch (error) {
      let message = 'Failed to generate reset link';
      
      if (error.response?.data) {
        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
          message = error.response.data.errors.join(', ');
        } else if (error.response.data.message) {
          message = error.response.data.message;
        }
      }
      
      // Show alert for incorrect security answer
      if (error.response?.status === 401 && error.response?.data?.message?.toLowerCase().includes('security answer')) {
        toast.error('Incorrect security answer. Please try again.', {
          duration: 4000,
          style: {
            background: '#d32f2f',
            color: '#fff',
          },
        });
        // Also show browser alert for better visibility
        alert('⚠️ Incorrect Security Answer\n\nThe security answer you entered is incorrect. Please make sure you are entering the exact answer you provided during registration.');
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#1a237e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        position: 'relative',
      }}
    >
      <AnimatedBackground />
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper 
          elevation={8} 
          sx={{ 
            p: 4, 
            width: '100%', 
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Forgot Password
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            Enter your email and security answer to receive a password reset link
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <TextField
                label="Security Answer"
                placeholder="Answer to your security question"
                type="text"
                fullWidth
                required
                size="small"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                disabled={loading}
                helperText="Enter the answer to your security question"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading || !email || !securityAnswer}
                sx={{ backgroundColor: '#1a237e', color: '#fff' }}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
              <Typography variant="body2" align="center">
                <a 
                  href="/login" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}
                  style={{ textDecoration: 'none', color: '#1a237e' }}
                >
                  Back to Login
                </a>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;

