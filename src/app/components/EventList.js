"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Box, Button, List, ListItem, Typography } from '@mui/material';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  const fetchEvents = () => {
    axios.get('http://localhost:3001/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  };

  return (
    <Box id="event-list">
      <h2>Upcoming Events</h2>
      <Button onClick={fetchEvents}>Load Events</Button>
      <List>
        {events.map(event => (
          <ListItem key={event.ID}>
            <Typography>Service Name:</Typography> {event.ServiceName}<br />
            <Typography>Description:</Typography> {event.SerDes}<br />
            <Typography>Price:</Typography> ${event.ServicePrice}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EventList;
