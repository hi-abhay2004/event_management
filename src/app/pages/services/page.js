// "use client"
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Header from '@/app/components/Header/page';
// import { Container, Grid, Typography, Card, CardActions, CardContent, CardMedia, Button } from '@mui/material';
// import Footer from '@/app/components/Footer';

// const Services = () => {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     // Replace the URL with your actual API endpoint
//     fetch('http://localhost:3001/services')
//       .then(response => response.json())
//       .then(data => setServices(data))
//       .catch(error => console.error('Error fetching services:', error));
//   }, []);
  
//   return (
//     <Grid sx={{ bgcolor: '#231b3b', width: '100%', minHeight: '100vh', color: '#fff', padding: '20px' }}>
//       <Header />
//       <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', my: 10 }}>Our Services</Typography>
//       <Container>
//         <Grid container spacing={6}>
//           {services.map((service, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card sx={{ maxWidth: 345, height: 450, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3, bgcolor: '#231b3b', border: 0.5, borderColor: '#4e4861', borderRadius: 5 }}>
//                 <CardMedia
//                   sx={{ height: 300 }}
//                   image={`https://source.unsplash.com/500x500/?${service.title}`}
//                   title={service.title}
//                   // priority={true}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div" color="#fff">
//                     {service.title}
//                   </Typography>
//                   <Typography variant="body2" color="#fff">
//                     {service.miniDescription}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Link href={`/pages/services/${encodeURIComponent(service.title.replace(/\s+/g, ''))}`} passHref>
//                     <Button size="small" sx={{ color: '#000', bgcolor: '#ff80e8', p: 1.5, m: 2, boxShadow: 3 }}>Learn More</Button>
//                   </Link>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//       <Footer />
//     </Grid>
//   );
// }

// export default Services;



"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header/page';
import { Container, Grid, Typography, Card, CardActions, CardContent, CardMedia, Button } from '@mui/material';
import Footer from '@/app/components/Footer';

const Services = () => {
  const [services, setServices] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    // Replace the URL with your actual API endpoint
    fetch('http://localhost:3001/services')
      .then(response => response.json())
      .then(data => {
        setServices(data);
        // Fetch images from Unsplash
        data.forEach(service => {
          fetch(`https://api.unsplash.com/search/photos?query=${service.title}&client_id=kuXavetTq1yeCMUGS0BWOKRFc26Oz1-_V2APCabKgz8`)
            .then(response => response.json())
            .then(data => {
              if (data.results && data.results.length > 0) {
                const imageUrl = data.results[0].urls.regular;
                setImages(prevImages => ({
                  ...prevImages,
                  [service.title]: imageUrl
                }));
              } else {
                console.error('No images found for:', service.title);
              }
            })
            .catch(error => console.error('Error fetching image:', error));
        });
      })
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  return (
    <Grid sx={{ bgcolor: '#231b3b', width: '100%', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <Header />
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', my: 10 }}>Our Services</Typography>
      <Container>
        <Grid container spacing={6}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345, height: 450, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3, bgcolor: '#231b3b', border: 0.5, borderColor: '#4e4861', borderRadius: 5 }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={images[service.title] || 'https://via.placeholder.com/500'} // Use placeholder if image not yet loaded
                  title={service.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="#fff">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="#fff">
                    {service.miniDescription}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/pages/services/${encodeURIComponent(service.title.replace(/\s+/g, ''))}`} passHref>
                    <Button size="small" sx={{ color: '#000', bgcolor: '#ff80e8', p: 1.5, m: 2, boxShadow: 3 }}>Book Now</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Grid>
  );
}

export default Services;
