'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Grid, Card, CardContent, TextField, Button, Rating, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import AdminSidebar from '../../adminComponents/adminSidebar/page';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Delete, Edit } from '@mui/icons-material';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [miniDescription, setMiniDescription] = useState('');
  const [mainDescription, setMainDescription] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [availability, setAvailability] = useState('');
  const [rating, setRating] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3001/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleAddService = async () => {
    try {
      const response = selectedService 
        ? await axios.put(`http://localhost:3001/api/services/${selectedService.id}`, {
            title,
            miniDescription,
            mainDescription,
            priceRange,
            availability,
            rating
          })
        : await axios.post('http://localhost:3001/api/services', {
            title,
            miniDescription,
            mainDescription,
            priceRange,
            availability,
            rating
          });
      
      toast.success(response.data.message);
      resetForm();
      setOpen(false);
      fetchServices();
    } catch (error) {
      if (error.response) {
        toast.error(`Failed to ${selectedService ? 'update' : 'add'} service: ${error.response.data.error}`);
      } else {
        toast.error('Failed to add or update service');
      }
      console.error('Error adding or updating service:', error);
    }
  };
  

  const handleEditService = (service) => {
    setSelectedService(service);
    setTitle(service.title);
    setMiniDescription(service.miniDescription);
    setMainDescription(service.mainDescription);
    setPriceRange(service.priceRange);
    setAvailability(service.availability);
    setRating(service.rating);
    setOpen(true);
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/services/${serviceId}`);
      toast.success(response.data.message);
      fetchServices();
    } catch (error) {
      toast.error('Failed to delete service');
      console.error('Error deleting service:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetForm = () => {
    setSelectedService(null);
    setTitle('');
    setMiniDescription('');
    setMainDescription('');
    setPriceRange('');
    setAvailability('');
    setRating('');
  };

  return (
    <Grid sx={{ display: 'flex', flexWrap: 'wrap', bgcolor: '#231b3b', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <AdminSidebar />
      <Container sx={{ mr: 5 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', my: 5, color: '#ff80e8' }}>
          Services
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ bgcolor: '#ff80e8', color: '#000', boxShadow: 3, mb: 3 ,float:'right'}}>
          Add Service
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedService ? 'Edit Service' : 'Add a New Service'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below to {selectedService ? 'edit the' : 'add a new'} service.
            </DialogContentText>
            <Box component="form" sx={{ mt: 3 }} noValidate>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Mini Description"
                value={miniDescription}
                onChange={(e) => setMiniDescription(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Main Description"
                value={mainDescription}
                onChange={(e) => setMainDescription(e.target.value)}
                fullWidth
                required
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Price Range"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddService} color="primary">
              {selectedService ? 'Update Service' : 'Add Service'}
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card sx={{ bgcolor: '#4e4861', color: '#fff', boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ color: '#ff80e8', mb: 2 }}>{service.title}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ color: '#fff', mb: 2 }}>
                    {service.miniDescription}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>{service.mainDescription}</Typography>
                  <Typography sx={{ mb: 2 }}><strong>Price Range:</strong> {service.priceRange}</Typography>
                  <Typography sx={{ mb: 2 }}><strong>Availability:</strong> {service.availability}</Typography>
                  <Rating name="rating" value={service.rating} precision={0.5} readOnly />
                  <IconButton onClick={() => handleDeleteService(service.id)} color="secondary" aria-label="delete service" sx={{ color: '#ff80e8',float:'right' }}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => handleEditService(service)} color="primary" aria-label="edit service" sx={{ color: '#ff80e8' ,float:'right'}}>
                    <Edit />
                  </IconButton>
                  
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
};

export default ServicesPage;