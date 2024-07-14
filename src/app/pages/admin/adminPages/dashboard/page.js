'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Box, Container, Grid, Card, CardActionArea, CardContent, Typography, Button } from '@mui/material';
import AdminSidebar from '../../adminComponents/adminSidebar/page';

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({});
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:3001/api/admin/statistics')
      .then(response => setStatistics(response.data))
      .catch(error => console.error('Error fetching statistics:', error));
  }, []);

  const handleCardClick = (route) => {
    router.push(route);
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <Grid container sx={{ display: 'flex', flexWrap: 'wrap', bgcolor: '#231b3b', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <AdminSidebar />
      <Container sx={{ marginRight: 10, marginTop: 4 }}>
        <Button
          variant="contained"
          color="error"
          sx={{ float: 'right', mb: 2 }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Dashboard
          </Typography>
          <Grid container spacing={3}>
            {[
              { title: 'Total New Bookings', value: statistics.totalNewBookings, route: '/pages/admin/adminPages/bookings' },
              { title: 'Total Approved Bookings', value: statistics.totalApprovedBookings, route: '/pages/admin/adminPages/bookings/approvedBooking' },
              // { title: 'Total Cancelled Bookings', value: statistics.totalCancelledBookings, route: '/admin/cancelled-bookings' },
              { title: 'Total Services', value: statistics.totalServices, route: '/pages/admin//adminPages/services' },
              { title: 'Total Event Types', value: statistics.totalEventTypes, route: '/pages/admin/adminPages/events' },
              { title: 'Total Users', value: statistics.totalUsers, route: '/pages/admin/adminPages/user' },  // Add total users statistic
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ backgroundColor: '#483778', color: 'white', borderRadius: 2 }}>
                  <CardActionArea onClick={() => handleCardClick(stat.route)}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h6" align="center">{stat.title}</Typography>
                      <Typography variant="h4" align="center">{stat.value}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
};

export default AdminDashboard;
