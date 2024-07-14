// pages/adminEvents.js

'use client'
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Button, Card, CardContent, CardActions } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminSidebar from '../../adminComponents/adminSidebar/page';

const AdminEvents = () => {
  const [eventName, setEventName] = useState('');
  const [eventTypes, setEventTypes] = useState([]);

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const fetchEventTypes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/eventTypes');
      const data = await response.json();
      setEventTypes(data);
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  };

  const handleChange = (e) => {
    setEventName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventTypeData = {
      name: eventName
    };

    try {
      const response = await fetch('http://localhost:3001/api/eventTypes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventTypeData)
      });

      if (response.ok) {
        toast.success('Event Type Created Successfully');
        setEventName('');  // Reset the form
        fetchEventTypes(); // Refresh the event types list
      } else {
        toast.error('Error Creating Event Type');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error Creating Event Type');
    }
  };

  return (
    <Grid sx={{ bgcolor: '#231b3b', width: '100%', minHeight: '100vh', color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <ToastContainer />
      <AdminSidebar />
      <Container sx={{ mr: 5 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', my: 10 }}>
          Add Event Type
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Event Type Name"
                name="eventName"
                value={eventName}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: '#fff' } }}
                inputProps={{ style: { color: '#fff' } }}
                sx={{ bgcolor: '#4e4861', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button type="submit" variant="contained" sx={{ color: '#000', bgcolor: '#ff80e8', p: 1.5, mt: 3, boxShadow: 3 }}>
                Add Event Type
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="h5" sx={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
          Available Event Types
        </Typography>
        <Grid container spacing={3}>
          {eventTypes.map((eventType) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={eventType.id}>
              <Card sx={{ bgcolor: '#4e4861', color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6">{eventType.name}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" sx={{ color: '#ff80e8' }}>Edit</Button>
                  <Button size="small" sx={{ color: '#ff80e8' }}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
};

export default AdminEvents;
