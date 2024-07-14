// pages/booking.js

'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Grid, Typography, TextField, MenuItem, Button } from '@mui/material';
import Header from '@/app/components/Header/page';
import Footer from '@/app/components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const locations = [
//   'New York', 
//   'Los Angeles', 
//   'Chicago', 
//   'Houston', 
//   'Phoenix'
// ];



const BookingForm = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    altPhoneNumber: '',
    location: '',
    eventType: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      ...formData,
      serviceTitle: title
    };
  
    try {
        const response = await fetch('http://localhost:3001/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingData)
        });
  
        if (response.ok) {
          toast.success("Booking Initiated, Our Team ll get back to you soon")
          console.log('Form submitted:', bookingData);
          // Optionally, redirect or show success message
        } else {
          console.error('Error submitting form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
    const [eventTypes, setEventTypes] = useState([]);

    useEffect(() => {
      // Fetch event types from API
      fetchEventTypes();
    }, []);
    const fetchEventTypes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/eventTypes');
        if (!response.ok) {
          throw new Error('Failed to fetch event types');
        }
        const data = await response.json();
        setEventTypes(data);
      } catch (error) {
        console.error('Error fetching event types:', error);
        // Handle error (e.g., show toast message)
      }
    };
    return (
        <Grid sx={{ bgcolor: '#231b3b', width: '100%', minHeight: '100vh', color: '#fff', padding: '20px' }}>
            <ToastContainer sx={{width:'100%'}}/>
          <Header />
          <Container>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', my: 10 }}>
              Booking {title} Service
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ style: { color: '#fff' } }}
                    inputProps={{ style: { color: '#fff' } }}
                    sx={{ bgcolor: '#4e4861', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ style: { color: '#fff' } }}
                    inputProps={{ style: { color: '#fff' } }}
                    sx={{ bgcolor: '#4e4861', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Alternative Phone Number"
                    name="altPhoneNumber"
                    value={formData.altPhoneNumber}
                    onChange={handleChange}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    inputProps={{ style: { color: '#fff' } }}
                    sx={{ bgcolor: '#4e4861', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    // select
                    variant="outlined"
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ style: { color: '#fff' } }}
                    SelectProps={{ style: { color: '#fff' } }}
                    sx={{ bgcolor: '#4e4861', borderRadius: 1 }}
                  >
                    {/* {locations.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))} */}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    variant="outlined"
                    label="Event Type"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ style: { color: '#fff' } }}
                    SelectProps={{ style: { color: '#fff' } }}
                    sx={{ bgcolor: '#4e4861', borderRadius: 1 }}
                  >
                   {eventTypes.map((eventType) => (
                  <MenuItem key={eventType.id} value={eventType.name}>
                    {eventType.name}
                  </MenuItem>
                ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    inputProps={{ style: { color: '#fff' } }}
                    sx={{ bgcolor: '#4e4861', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Button type="submit" variant="contained" sx={{ color: '#000', bgcolor: '#ff80e8', p: 1.5, mt: 3, boxShadow: 3 }}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
          <Footer />
        </Grid>
      );
}

export default BookingForm;
