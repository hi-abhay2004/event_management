"use client"
import React, { useEffect, useState } from 'react';
import { Grid, Typography, Container, Box, IconButton } from '@mui/material';
import { EmailOutlined } from '@mui/icons-material';
import axios from 'axios';

const MyQueryPage = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    // Fetch user's queries from the server
    axios.get('http://localhost:3001/api/user/queries')
      .then(response => {
        setQueries(response.data);
      })
      .catch(error => {
        console.error('Error fetching queries:', error);
      });
  }, []);

  return (
    <Grid sx={{ bgcolor: '#f0f0f0', width: '100%', minHeight: '100vh', color: '#333', padding: '20px' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          My Queries
        </Typography>
        {queries.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <EmailOutlined sx={{ fontSize: 80, color: '#ccc' }} />
            <Typography variant="h6" color="textSecondary">
              Your inbox is empty.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} mt={4}>
            {queries.map(query => (
              <Grid item xs={12} key={query.id}>
                <Paper sx={{ p: 2, boxShadow: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Subject: {query.subject}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Message: {query.message}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Date: {new Date(query.created_at).toLocaleDateString()}
                  </Typography>
                  {query.response && (
                    <>
                      <Typography variant="body1" gutterBottom>
                        Response: {query.response}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Response Date: {new Date(query.updated_at).toLocaleDateString()}
                      </Typography>
                    </>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Grid>
  );
};

export default MyQueryPage;
