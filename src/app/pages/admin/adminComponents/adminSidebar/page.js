'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, Grid } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Image from 'next/image';
import logo from '../../../../assets/Logo (1).png'
import PersonIcon from '@mui/icons-material/Person';

const AdminSidebar = () => {
  const router = useRouter();

  const menuItems = [
    { text: 'Dashboard', icon: <InboxIcon />, route: '/pages/admin/adminPages/dashboard' },   
    { text: 'All user', icon: <PersonIcon/>, route: '/pages/admin/adminPages/user' },       

    // { text: 'Unread Queries', icon: <InboxIcon />, route: '/pages/admin/unread-queries' },
    // { text: 'Read Queries', icon: <MailIcon />, route: '/pages/admin/read-queries' },
    { text: 'New Booking', icon: <InboxIcon />, route: '/pages/admin/adminPages/bookings' },
    { text: 'Approved Booking', icon: <MailIcon />, route: '/pages/admin/adminPages/bookings/approvedBooking' },
    { text: 'Services', icon: <MailIcon />, route: '/pages/admin/adminPages/services' },
    { text: 'Event Type', icon: <InboxIcon />, route: '/pages/admin/adminPages/events' },
    { text: 'Query', icon: <InboxIcon />, route: '/pages/admin/adminPages/query' },
  ];

  return (
    // <Box sx={{display:'flex'}}>
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 255, boxSizing: 'border-box', backgroundColor: '#483778', color: 'white',marginRight:10},

        
      }}
    >
      <Image
                src={logo}
                width={250}
                height={100}
                alt="logo"
                // style={{marginLeft:'-5px'}}
              />
     
      <List >
        {menuItems.map((item, index) => (
          <ListItem button key={item.text} onClick={() => router.push(item.route)} >
            <ListItemIcon sx={{ color: 'white' }}>
              
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
    // </Box>
  );
};

export default AdminSidebar;
