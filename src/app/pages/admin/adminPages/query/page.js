"use client"
import React, { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, IconButton, Modal, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import AdminSidebar from '../../adminComponents/adminSidebar/page';

const AdminQueryPage = () => {
  const [queries, setQueries] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = () => {
    axios.get('http://localhost:3001/api/queries')
      .then(response => {
        setQueries(response.data);
      })
      .catch(error => {
        console.error('Error fetching queries:', error);
      });
  };

  const handleOpenModal = (query) => {
    setSelectedQuery(query);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedQuery(null);
    setResponseText('');
  };

  const handleResponseChange = (event) => {
    setResponseText(event.target.value);
  };

  const handlePostResponse = () => {
    axios.put(`http://localhost:3001/api/queries/${selectedQuery.id}/response`, { response: responseText })
      .then(() => {
        // Update local state
        const updatedQueries = queries.map(query => {
          if (query.id === selectedQuery.id) {
            return { ...query, response: responseText, status: 'read' };
          }
          return query;
        });
        setQueries(updatedQueries);
        handleCloseModal();
      })
      .catch(error => {
        console.error('Error updating response:', error);
      });
  };

  return (
    <Grid sx={{ bgcolor: '#231b3b', width: '100%', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <AdminSidebar/>
      <Container maxWidth="lg" sx={{ float:'right', mt: 4, mr: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us Queries
        </Typography>
        <TableContainer component={Paper}  sx={{ bgcolor: '#4e4861', color: 'white' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>ID</TableCell>
                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Email</TableCell>
                <TableCell sx={{ color: 'white' }}>Subject</TableCell>
                <TableCell sx={{ color: 'white' }}>Message</TableCell>
                <TableCell sx={{ color: 'white' }}>Date</TableCell>
                <TableCell sx={{ color: 'white' }}>Response</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.map((query) => (
                <TableRow key={query.id}>
                  <TableCell sx={{ color: 'white' }}>{query.id}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{query.name}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{query.email}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{query.subject}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{query.message}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{new Date(query.created_at).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    {query.response ? query.response : (
                      <IconButton color="primary" onClick={() => handleOpenModal(query)}>
                        <Box component="span" className="material-icons" aria-label="edit">
                          edit
                        </Box>
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>{query.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Modal for Response */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography variant="h6" id="modal-title" gutterBottom>
            Respond to Query
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={responseText}
            onChange={handleResponseChange}
            placeholder="Enter your response here"
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handlePostResponse}>
              Post Response
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default AdminQueryPage;
