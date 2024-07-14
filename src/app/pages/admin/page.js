'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/Logo (1).png';
import Image from 'next/image';
const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAdminLogin = () => {
    const adminEmail = 'admin';
    const adminPassword = 'admin';

    if (email === adminEmail && password === adminPassword) {
      // Show success toast notification
      toast.success('Login Successful');

      // Redirect to admin dashboard after a short delay to allow the toast to be seen
      setTimeout(() => {
        router.push('/pages/admin/adminPages/dashboard');
      }, 2000); // 2 seconds delay
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Grid sx={{ bgcolor: '#483778', width: '100%', height: '100vh' }}>
      <ToastContainer />

      <Container component="main" maxWidth="xs" sx={{ bgcolor: '#483778', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <CssBaseline />
        <Image
          src={logo}
          width={270}
          height={100}
          alt="Background Image"
          priority={true}
        />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#231b3b' }}
              onClick={handleAdminLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};

export default AdminLoginPage;
