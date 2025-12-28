import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import AnimatedBackground from '../components/AnimatedBackground';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
       if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (!securityQuestion.trim() || securityQuestion.trim().length < 5) {
      toast.error('Security question must be at least 5 characters');
      return;
    }
    if (!securityAnswer.trim() || securityAnswer.trim().length < 2) {
      toast.error('Security answer must be at least 2 characters');
      return;
    }
    setLoading(true);
    const result = await register(username, email, password, securityQuestion, securityAnswer);
    if (result.success) {
      navigate('/login');
     }
    setLoading(false);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#1a237e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py:4,
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
            Task Manager Pro
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} mt={2}>
              <TextField
                label="Username"
                type="text"
                fullWidth
                required
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                error={password !== '' && password.length < 6}
                helperText={
                  passwordFocused
                    ? password === ''
                      ? 'Password must be at least 6 characters'
                      : password.length < 6
                      ? 'Password must be at least 6 characters'
                      : confirmPassword !== '' && password !== confirmPassword
                      ? 'Passwords do not match'
                      : ''
                    : ''
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                required
                size="small"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
                error={confirmPassword !== '' && password !== confirmPassword}
                helperText={
                  confirmPasswordFocused
                    ? confirmPassword === ''
                      ? 'Confirm your password'
                      : password !== confirmPassword
                      ? 'Passwords do not match'
                      : 'Passwords match ✓'
                    : ''
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                        size="small"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Security Question"
                placeholder="e.g., What was the name of your first pet?"
                type="text"
                fullWidth
                required
                size="small"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                helperText="This will be used to reset your password if forgotten"
              />
              <TextField
                label="Security Answer"
                placeholder="Your answer to the security question"
                type="text"
                fullWidth
                required
                size="small"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                helperText="Remember this answer - you'll need it to reset your password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={
                  loading ||
                  password.length < 6 ||
                  confirmPassword === '' ||
                  password !== confirmPassword ||
                  !securityQuestion.trim() ||
                  !securityAnswer.trim()
                }
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>
              <Typography variant="body2" align="center">
                Already have an account?{' '}
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  Sign in
                </Link>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Container>
      </Box>
  );
};

export default Register;

