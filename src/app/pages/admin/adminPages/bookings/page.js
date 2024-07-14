'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import AdminSidebar from '../../adminComponents/adminSidebar/page';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/bookings/status/pending');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:3001/api/bookings/${id}/status`, { status });
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        )
      );
      toast.success(`Booking ${status} successfully`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Error updating booking status');
    }
  };

  return (
    <Grid sx={{ bgcolor: '#231b3b', width: '100%', minHeight: '100vh', color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <ToastContainer />
      <AdminSidebar />
      <Box component="main" maxWidth="lg" sx={{ marginLeft:35 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px'}}>
          Admin: Pending Bookings
        </Typography>
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} md={4} key={booking.id}>
              <Card sx={{ bgcolor: '#4e4861', color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6">{booking.name}</Typography>
                  <Typography variant="body1">Phone: {booking.phone_number}</Typography>
                  <Typography variant="body1">Event Type: {booking.event_type}</Typography>
                  <Typography variant="body1">Status: {booking.status}</Typography>
                  <Button onClick={() => handleStatusChange(booking.id, 'approved')} color="primary" variant='contained' size='small' sx={{m:1, color: '#000', bgcolor: '#ff80e8'}}>
                    Approve
                  </Button>
                  <Button onClick={() => handleStatusChange(booking.id, 'rejected')} color="secondary" variant='contained' size='small' sx={{ color: 'secondary', bgcolor: 'secondary' }}>
                    Reject
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default AdminBookings;
