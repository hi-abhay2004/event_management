'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Grid,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminSidebar from '../../adminComponents/adminSidebar/page';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [newUser, setNewUser] = useState({ email: '', password: '', name: '', phoneNumber: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async () => {
        try {
            if (!deleteUserId) {
                console.error('No user ID to delete.');
                return;
            }

            await axios.delete(`http://localhost:3001/api/users/${deleteUserId}`);

            setUsers(users.filter(user => user.id !== deleteUserId));
            setDeleteUserId(null);
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            fetchUsers();
        }
    };

    const handleAddUser = async () => {
        try {
            await axios.post('http://localhost:3001/api/users', newUser);
            fetchUsers();
            setNewUser({ email: '', password: '', name: '', phoneNumber: '' });
            setAddDialogOpen(false);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };
    // console.log("aksdjfkdsjl",users[0].email)
    const openDeleteDialog = (userId) => {
        setDeleteUserId(userId);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteUserId(null);
        setDeleteDialogOpen(false);
    };

    const openAddDialog = () => {
        setAddDialogOpen(true);
    };

    const closeAddDialog = () => {
        setNewUser({ email: '', password: '', name: '', phoneNumber: '' });
        setAddDialogOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Grid sx={{ bgcolor: '#231b3b', width: '100%', minHeight: '100vh', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <AdminSidebar />
            <Grid item xs={12}>
                <Typography variant="h4">Users</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" sx={{ float: 'right', m: 2 }} onClick={openAddDialog}>
                    Add User
                </Button>
            </Grid>
            <Grid item xs={12} sx={{ width: '80%', ml: 35 }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <TableContainer component={Paper} sx={{ bgcolor: '#4e4861', color: 'white' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: 'white' }}>ID</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Email</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Name</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Phone Number</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                  
                                    <TableRow key={user.id}>
                                        <TableCell sx={{ color: 'white' }}>{user.user_id}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{user.name}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{user.phoneNumber}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => openDeleteDialog(user.user_id)}>
                                                <DeleteIcon sx={{ color: 'white' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Grid>
            {/* Add User Dialog */}
            <Dialog open={addDialogOpen} onClose={closeAddDialog}>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={newUser.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        value={newUser.password}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={newUser.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="phoneNumber"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        value={newUser.phoneNumber}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddDialog}>Cancel</Button>
                    <Button onClick={handleAddUser} variant="contained" color="primary">
                        Add User
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this user?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Cancel</Button>
                    <Button onClick={handleDeleteUser} variant="contained" color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default UsersPage;
