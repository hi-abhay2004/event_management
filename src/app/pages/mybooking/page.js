'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuth } from '@/app/context/authContext/page';
import { Grid } from '@mui/material';
import Header from '@/app/components/Header/page';
import Footer from '@/app/components/Footer';

const BookingsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      if (user && user.user && user.user.phoneNumber) {
        try {
          const response = await axios.get(`http://localhost:3001/api/bookings?phoneNumber=${user.user.phoneNumber}`);
          setBookings(response.data);
        } catch (error) {
          console.error('Error fetching bookings:', error);
          setError('Error fetching bookings');
        }
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <Grid sx={{ bgcolor: '#483778' }}>
      <Header />
      <Container component="main" maxWidth="lg" sx={{ bgcolor: '#483778', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CssBaseline />
        <Box sx={{ bgcolor: 'white', padding: 4, borderRadius: 2, boxShadow: 3, width: '100%' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            My Bookings
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Booking ID</TableCell>
                  <TableCell align="right">Event Name</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell component="th" scope="row">
                      {booking.id}
                    </TableCell>
                    <TableCell align="right">{booking.event_type}</TableCell>
                    <TableCell align="right">{new Date(booking.created_at).toLocaleString()}</TableCell>
                    <TableCell align="right">{booking.location}</TableCell>
                    <TableCell align="right">{booking.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Footer />
    </Grid>
  );
};

export default BookingsPage;
