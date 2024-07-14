// src/app/pages/profile/page.js
'use client'
import React from 'react';
 
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
// import CssBaseline from '@mui/material/CssBaseline';
import { useAuth } from '@/app/context/authContext/page';
import { Grid } from '@mui/material';
import Header from '@/app/components/Header/page';
import Footer from '@/app/components/Footer';

const ProfilePage = () => {
  const { user } = useAuth(); 
    console.log("jdhjfdjfhdjh",user?.user)
  return (
    <Grid sx={{ bgcolor: '#483778'}}>
        <Header/>
    <Container component="main" maxWidth="sm" sx={{bgcolor: '#483778', height: '100vh' }}>
      {/* <CssBaseline /> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Avatar
          alt={user?.user?.name}
          src={user?.user?.avatarUrl || '/path/to/default/avatar.jpg'}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography component="h1" variant="h5">
          {user?.user?.name}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Email: {user?.user?.email}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Phone Number: {user?.user?.phoneNumber}
        </Typography>
        {/* Add more user details here as needed */}
      </Box>
    </Container>
    <Footer/>
    </Grid>
  );
};

export default ProfilePage;
