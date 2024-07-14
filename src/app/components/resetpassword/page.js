"use client"
// import React, { useState, useEffect } from 'react';
// import Typography from '@mui/material/Typography';
// import { Box, Button, Card, Grid, TextField } from '@mui/material';
// import { useAuth } from '@/app/context/authContext/page';
// import { useLocation, BrowserRouter as Router } from 'react-router-dom'; // Updated import
// import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
// import { auth } from '@/app/config/page';
// const useQuery = () => {
//     return new URLSearchParams(useLocation().search);
// }

// const Verification = () => {
//     const { verifyEmail, resetPass } = useAuth();
//     const query = useQuery();
//     const oobCode = query.get('oobCode');
//     const continueUrl = query.get('continueUrl');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const mode = query.get('mode');

//     useEffect(() => {
//         // Verify email when component mounts
//         if (mode === 'verifyEmail' && oobCode) {
//             verifyEmail(oobCode)
//                 .then(() => {
//                     toast.success("Email verified successfully");
//                     console.log("Email verified successfully");
//                     // Redirect to continueUrl if provided
//                     if (continueUrl) {
//                         window.location.href = continueUrl;
//                     }
//                 })
//                 .catch((err) => {
//                     toast.error(err.message);
//                     console.error("Error verifying email:", err);
//                     // Handle error (e.g., display error message to user)
//                 });
//         }
//     }, [mode, oobCode, continueUrl, verifyEmail]);

//     const handleResetPassword = () => {
//         if (newPassword !== confirmPassword) {
//             setError('Passwords do not match');
//             return;
//         }

//         resetPass(oobCode, newPassword)
//             .then(() => {
//                 toast.success("Password changed successfully");
//                 console.log("Password changed successfully");
//                 // Redirect or display success message as needed
//             })
//             .catch((err) => {
//                 toast.error(err.message);
//                 console.error("Error resetting password:", err);
//                 // Handle error (e.g., display error message to user)
//             });
//     };

//     return (
//         <Grid container justifyContent="center">
//             <Card sx={{ maxWidth: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10% auto', flexDirection: 'column' }}>
//                 <Typography variant="h6">{mode === 'verifyEmail' ? 'Verify Email' : 'Reset Password'}</Typography>
//                 {mode !== 'verifyEmail' && (
//                     <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', p: 2 }}>
//                         <TextField
//                             id="new-password"
//                             label="New Password"
//                             type="password"
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                             variant="standard"
//                             sx={{ m: 2 }}
//                         />
//                         <TextField
//                             id="confirm-password"
//                             label="Confirm Password"
//                             type="password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             variant="standard"
//                             sx={{ m: 2 }}
//                         />
//                         {error && <Typography variant="body2" color="error">{error}</Typography>}
//                         <Button variant="contained" color="primary" sx={{ m: 2 }} onClick={handleResetPassword}>
//                             Reset Password
//                         </Button>
//                     </Box>
//                 )}
//             </Card>
//         </Grid>
//     );
// };

// const App = () => (
//     <Router>
//         <Verification />
//     </Router>
// );

// export default App;


import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Card, Grid, Paper, TextField } from '@mui/material';
import { useAuth } from '@/app/context/authContext/page';
import { useLocation, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '@/app/config/page';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import DraftsIcon from '@mui/icons-material/Drafts';
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Verification = () => {
    const { user,verifyEmail, resetPass } = useAuth();
    const query = useQuery();
    const oobCode = query.get('oobCode');
    const continueUrl = query.get('continueUrl');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const mode = query.get('mode');
    const router = useRouter();
    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
      if (mode === 'verifyEmail' && oobCode && !redirected) {
        verifyEmail(oobCode, continueUrl)
          .then(() => {
            toast.success("Email verified successfully");
            console.log("Email verified successfully");
            if (continueUrl) {
              window.location.href = continueUrl;
            }
            setRedirected(true); 
            router.push('/');
          })
          .catch((err) => {
            toast.error(err.message);
            console.error("Error verifying email:", err);
          });
      }
    }, [mode, oobCode, continueUrl, verifyEmail, redirected, router]);

    const handleResetPassword = () => {
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        resetPass(oobCode, newPassword)
            .then(() => {
                toast.success("Password changed successfully");
                console.log("Password changed successfully");
                setInterval(() => {
                    router.push('/')
                }, 1000);
            })
            .catch((err) => {
                toast.error(err.message);
                console.error("Error resetting password:", err);
            });
    };
    console.log("kdjfkjd",user)
    return (
        <Grid container justifyContent="center">
            <ToastContainer sx={{ width: '100%' }} />
            <Card sx={{ maxWidth: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10% auto', flexDirection: 'column' }}>
                <Typography variant="h6">{mode === 'verifyEmail' ? "" : ''}</Typography>
                {mode !== 'verifyEmail' && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', p: 2 }}>
                         <Button sx={{ p: 2, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 1}}>
                        <svg width='35' height='24' viewBox='0 0 34 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path fillRule='evenodd' clipRule='evenodd' d='M0.00183571 0.3125V7.59485C0.00183571 7.59485 -0.141502 9.88783 2.10473 11.8288L14.5469 23.6837L21.0172 23.6005L19.9794 10.8126L17.5261 7.93369L9.81536 0.3125H0.00183571Z' fill='currentColor'></path>
                          <path opacity='0.06' fillRule='evenodd' clipRule='evenodd' d='M8.17969 17.7762L13.3027 3.75173L17.589 8.02192L8.17969 17.7762Z' fill='#161616'></path>
                          <path opacity='0.06' fillRule='evenodd' clipRule='evenodd' d='M8.58203 17.2248L14.8129 5.24231L17.6211 8.05247L8.58203 17.2248Z' fill='#161616'></path>
                          <path fillRule='evenodd' clipRule='evenodd' d='M8.25781 17.6914L25.1339 0.3125H33.9991V7.62657C33.9991 7.62657 33.8144 10.0645 32.5743 11.3686L21.0179 23.6875H14.5487L8.25781 17.6914Z' fill='currentColor'></path>
                        </svg>
                        <h3>SKYLIGHTS</h3>
                      </Button>
                        <TextField
                            id="new-password"
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            variant="standard"
                            sx={{ m: 2 }}
                        />
                        <TextField
                            id="confirm-password"
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            variant="standard"
                            sx={{ m: 2 }}
                        />
                        {error && <Typography variant="body2" color="error">{error}</Typography>}
                        <Button variant="contained" color="primary" sx={{ m: 2 }} onClick={handleResetPassword}>
                            Reset Password
                        </Button>
                    </Box>
                )}{mode == 'verifyEmail' &&(
                    <>
                    <Paper elevation={8} sx={{ width: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', p: 3, borderRadius: 12, }}>
                      <Button sx={{ p: 2, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 1}}>
                        <svg width='35' height='24' viewBox='0 0 34 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path fillRule='evenodd' clipRule='evenodd' d='M0.00183571 0.3125V7.59485C0.00183571 7.59485 -0.141502 9.88783 2.10473 11.8288L14.5469 23.6837L21.0172 23.6005L19.9794 10.8126L17.5261 7.93369L9.81536 0.3125H0.00183571Z' fill='currentColor'></path>
                          <path opacity='0.06' fillRule='evenodd' clipRule='evenodd' d='M8.17969 17.7762L13.3027 3.75173L17.589 8.02192L8.17969 17.7762Z' fill='#161616'></path>
                          <path opacity='0.06' fillRule='evenodd' clipRule='evenodd' d='M8.58203 17.2248L14.8129 5.24231L17.6211 8.05247L8.58203 17.2248Z' fill='#161616'></path>
                          <path fillRule='evenodd' clipRule='evenodd' d='M8.25781 17.6914L25.1339 0.3125H33.9991V7.62657C33.9991 7.62657 33.8144 10.0645 32.5743 11.3686L21.0179 23.6875H14.5487L8.25781 17.6914Z' fill='currentColor'></path>
                        </svg>
                        <h3>SKYLIGHTS</h3>
                      </Button>
                      <DraftsIcon sx={{ fontSize: 100, color: '#4fc3f7', marginTop: 10 }} />
                      <Typography variant="h6" color="initial" sx={{ marginBottom: 10 }}>Email Verified Successfully</Typography>
                      <Typography variant="body1" color="initial" sx={{ textAlign: 'center' }}>Thank you for verifying your email. You're all set to explore Skylights!</Typography>
                    </Paper>
                  </>
                  
                )}
            </Card>
        </Grid>
    );
};

const App = () => (
    <Router>
        <Verification />
    </Router>
);

export default App;
