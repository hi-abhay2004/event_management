// 'use client'
// import Link from "next/link";
// import { useRouter } from 'next/navigation';


// const Header = () => {
//     const router = useRouter();
//   return (
//     // <header>
//     //   <h1>Event Management</h1>
//     //   <nav>
//     //     <ul>
//     //       <li><Link href="/">Home</Link></li>
//     //       <li><Link href="/events">Events</Link></li>
//     //       <li onClick={()=>router.push('../pages/create')}>Create Event</li>
//     //     </ul>
//     //   </nav>
//     // </header>
//     <>
//     <Box></Box>
//     </>
//   );
// };

// export default Header;
// src/app/components/Header/page.js
'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from'../../assets/Logo (1).png';
import { useAuth } from '@/app/context/authContext/page'; // Fixed import path
import Image from 'next/image';
import { Router, useRouter } from 'next/navigation';

const drawerWidth = 240;

function Header(props) {
  const { window } = props;
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isLoggedIn, user,logout } = useAuth();
  console.log("dkfjdkfj",isLoggedIn, user)
  const navItems = [
    { name: 'Home', route: '/' },
    { name: 'Service', route: '/pages/services' },
    { name: 'Gallery', route: '/pages/gallery' },
    // { name: 'About', route: '/about' },
    { name: 'Contact Us', route: '/pages/contactUs' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const container = typeof window !== 'undefined' ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: '#231b3b', width: '95%', m: 5, mt: 3, height: '7%' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
             <Image
          src={logo}
          width={270}
          height={100}
          alt="Background Image"
          priority={true}
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          onClick={()=>router.push('/')}
        />
          </Typography>
          {isLoggedIn ? (
            <>
          <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
            {navItems.map((item) => (
              <Button key={item.name} sx={{ color: '#fff' }} component={Link} href={item.route}>
                {item.name}
              </Button>
            ))}
          </Box>
          
            <Box>
               <IconButton onClick={handleAvatarClick} sx={{ ml: 2 }}>
      <Avatar alt={user?.name} src={user?.avatarUrl || '/path/to/default/avatar.jpg'} />
    </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose} component={Link} href="/pages/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} href="/pages/mybooking">
                  My Bookings
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} href="/pages/query">
                  My Query
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); logout(); }} component={Link} href="/">
                  Logout
                </MenuItem>
              </Menu>
            </Box>
            </>
          ) : (
            <Box sx={{  }}>
              <Button sx={{ color: '#fff' }} component={Link} href="/pages/login">
                Login
              </Button>
              <Button sx={{ color: '#fff' }} component={Link} href="/pages/createAccount">
                Create Account
              </Button>
              <Button sx={{ color: '#fff' }} component={Link} href="/pages/admin">
                Admin Login
              </Button>
            </Box>
          )}
        </Toolbar>
     
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              MUI
            </Typography>
            <Divider />
            <List>
              {navItems.map((item) => (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }} component={Link} href={item.route}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
