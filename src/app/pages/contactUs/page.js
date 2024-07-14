"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import Header from '@/app/components/Header/page';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/contact', formData);
      setMessage(response.data.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setMessage('Error sending message, please try again later.');
    }
  };
console.log("kfdjfkj",formData)
  return (
    <Grid sx={{ bgcolor: '#231b3b', width: '100%', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <Header />
    <Container maxWidth="sm" sx={{ mt: 4 ,bgcolor:'#fff',p:5,borderRadius:3}}>
      <Typography variant="h4" gutterBottom color={'#000'}>Contact Us</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">Send Message</Button>
        </Box>
      </form>
      {message && (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Container>
    </Grid>
  );
};

export default ContactUs;
