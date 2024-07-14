'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
  Box,
} from '@mui/material';
import AdminSidebar from '../../../adminComponents/adminSidebar/page';

const ApprovedBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchApprovedBookings();
  }, []);

  const fetchApprovedBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/bookings/status/approved');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching approved bookings:', error);
    }
  };

  return (
    <Grid sx={{ bgcolor: '#231b3b', width: '100%', minHeight: '100vh', color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <AdminSidebar />
      <Box component="main" maxWidth="lg" sx={{ ml:35}}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', my: 5, color: '#ff80e8' }}>
          Approved Bookings
        </Typography>
        <TableContainer component={Paper} sx={{ bgcolor: '#4e4861', color: '#fff' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ff80e8' }}>Name</TableCell>
                <TableCell sx={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ff80e8' }}>Phone Number</TableCell>
                <TableCell sx={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ff80e8' }}>Alt Phone Number</TableCell>
                <TableCell sx={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ff80e8' }}>Location</TableCell>
                <TableCell sx={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ff80e8' }}>Event Type</TableCell>
                <TableCell sx={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ff80e8' }}>Description</TableCell>
                <TableCell sx={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ff80e8' }}>Service Title</TableCell>
                <TableCell sx={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ff80e8' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell sx={{ fontSize: '1.1rem', color: '#fff' }}>{booking.name}</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem', color: '#fff' }}>{booking.phone_number}</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem', color: '#fff' }}>{booking.alt_phone_number}</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem', color: '#fff' }}>{booking.location}</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem', color: '#fff' }}>{booking.event_type}</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem', color: '#fff' }}>{booking.description}</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem', color: '#fff' }}>{booking.service_title}</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem', color: '#fff' }}>{booking.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default ApprovedBookingsPage;
