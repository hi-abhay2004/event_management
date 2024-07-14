'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from '@mui/material';
import logo from '../../assets/Logo (1).png'
import Image from 'next/image';
// import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CreateAccountPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const route = useRouter();

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/users', {
        email,
        password,
        name,
        phoneNumber,
      });
      toast.success("Account Created successfully")
      console.log('Account created:', response.data);
      route.push("/")

      // Redirect to login page or perform other actions on successful account creation
    } catch (error) {
      if (error.response) {
        console.error('Create account error:', error.response.data);
        setError(error.response.data.error || 'An error occurred while creating the account');
      } else if (error.request) {
        console.error('Create account error:', error.request);
        setError('Network Error: No response from the server');
      } else {
        console.error('Create account error:', error.message);
        setError('An error occurred while creating the account');
      }
    }
  };

  return (
    <Grid sx={{ bgcolor: '#483778'}}>
            <ToastContainer sx={{width:'100%'}}/>
      
    <Container component="main" maxWidth="xs" sx={{ bgcolor: '#483778', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' ,flexDirection:'column'}}>
      {/* <CssBaseline /> */}
      <Image
          src={logo}
          width={270}
          height={100}
          alt="Background Image"
          priority={true}
          style={{marginBottom:5}}
        />
    <Box
      sx={{

        borderRadius: 2,
        boxShadow: 3,
        bgcolor: '#fff',
        padding: 4,
        color: 'white'
      }}
    >
      <Typography component="h1" variant="h5" sx={{ marginBottom: 2 ,color:'#000'}}>
        Create Account
      </Typography>
      {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autoComplete="tel"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ bgcolor: '#231b3b', color: 'white' }}
            onClick={handleCreateAccount}
          >
            Create Account
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Container>
  </Grid>
  );
};

export default CreateAccountPage;
