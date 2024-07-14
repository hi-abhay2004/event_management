// "use client"
// import Footer from '@/app/components/Footer';
// import Header from '@/app/components/Header/page';
// import { Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
// import Button from '@mui/material/Button';
// import React, { useEffect, useState } from 'react';

// const Gallery = () => {
//   const [completedEvents, setCompletedEvents] = useState([]);

//   useEffect(() => {
//     // Replace the URL with your actual API endpoint
//     fetch('http://localhost:3001/completed-events')
//       .then(response => response.json())
//       .then(data => setCompletedEvents(data))
//       .catch(error => console.error('Error fetching completed events:', error));
//   }, []);

//   return (
//     <Grid sx={{ bgcolor: '#231b3b', width: '100%', minHeight: '100vh', color: '#fff', padding: '20px' }}>
//       <Header />
//       <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>Gallery</Typography>
//       <Container>
//         <Grid container spacing={3}>
//           {completedEvents.map((event, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card sx={{ maxWidth: 345, height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3, bgcolor: '#231b3b', border: 0.5, borderColor: '#4e4861' }}>
//                 <CardMedia
//                   sx={{ height: 300 }}
//                   image={event.image}
//                   title={event.title}
//                   priority={true}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div" color="#fff">
//                     {event.title}
//                   </Typography>
//                   <Typography variant="body2" color="#fff">
//                     {event.description}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//       <Footer/>
//     </Grid>
//   );
// }

// export default Gallery;


"use client"
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header/page';
import { Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Gallery = () => {
  const [completedEvents, setCompletedEvents] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    // Fetch completed events
    fetch('http://localhost:3001/completed-events')
      .then(response => response.json())
      .then(data => {
        setCompletedEvents(data);

        // Fetch random images from Unsplash for each event
        data.forEach(event => {
          fetch(`https://api.unsplash.com/photos/random?query=${event.title}&client_id=kuXavetTq1yeCMUGS0BWOKRFc26Oz1-_V2APCabKgz8`)
            .then(response => response.json())
            .then(imageData => {
              if (imageData.urls && imageData.urls.regular) {
                const imageUrl = imageData.urls.regular;
                setImages(prevImages => ({
                  ...prevImages,
                  [event.title]: imageUrl
                }));
              } else {
                console.error('No images found for:', event.title);
              }
            })
            .catch(error => console.error('Error fetching image:', error));
        });
      })
      .catch(error => console.error('Error fetching completed events:', error));
  }, []);

  return (
    <Grid sx={{ bgcolor: '#231b3b', width: '100%', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <Header />
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>Gallery</Typography>
      <Container>
        <Grid container spacing={3}>
          {completedEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345, height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3, bgcolor: '#231b3b', border: 0.5, borderColor: '#4e4861' }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={images[event.title] || 'https://via.placeholder.com/345x300'}
                  title={event.title}
                  priority={true}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="#fff">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="#fff">
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Grid>
  );
}

export default Gallery;
