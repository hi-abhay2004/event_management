// "use client"
// import React, { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, Rating } from '@mui/material';
// import Header from '@/app/components/Header/page';
// import Footer from '@/app/components/Footer';

// const ServiceDetails = () => {
//   const router = useRouter();
//   console.log("rrr", router);
//   // const  title  = router.query;
//   const [service, setService] = useState(null);
// const{title} = useParams();
// const filterData = [
//     {"title": "DJ and Music Services",param:'DJandMusicServices'},
//     {"title": "Party Services", param:'PartyServices'},
//     {"title":"Cocktail and Beverage Services", param:"CocktailandBeverageServices"},
//     {"title": "Photo and Video Services", param:'PhotoandVideoServices'},
//     {"title": "Decoration and Theming", param:"DecorationandTheming"},
//     {"title": "Food and Catering Services", param:"FoodandCateringServices"},
//     {"title": "Entertainment Services", param:"EntertainmentServices"},
//     {"title": "Corporate Event Services", param:"CorporateEventServices"},
//     {"title": "Wedding Services", param:"WeddingServices"},
//     {"title": "Logistics and Support", param:"LogisticsandSupport"},


    
// ]
//   useEffect(() => {
//     // if (title) {
//       // Replace the URL with your actual API endpoint
//       fetch(`http://localhost:3001/services`)
//         .then(response => response.json())
//         .then(data => {
//             const filtredTitle = filterData.filter((data)=>data.param === title)[0].title;
//           if (data.length > 0) {
//             setService(data.filter((data)=>data.title === filtredTitle)[0]);
//           }
//         })
//         .catch(error => console.error('Error fetching service details:', error));
//     }
//   );
// console.log("kfdjfkdjf",service)
//   // if (!service) return <Typography variant="h5" color="#fff">Loading...</Typography>;
    
//   return (
//     <Grid sx={{ bgcolor: '#231b3b', width: '100%', minHeight: '100vh', color: '#fff', padding: '20px' }}>
//       <Header />
//       <Container>
//       {service ? 
//         <Card sx={{ maxWidth: 800, margin: 'auto', boxShadow: 3, bgcolor: '#231b3b', border: 0.5, borderColor: '#4e4861', borderRadius: 5 }}>
       

// <CardMedia
//    sx={{ height: 400 }}
//    image={`https://source.unsplash.com/800x400/?${service?.title}`}
//    title={service.title}
//    priority={true}
//  /> 
//          <CardContent>
//                 <Typography variant="h4" component="div" color="#fff" gutterBottom>
//                   {service.title}
//                 </Typography>
//                 <Typography variant="body1" color="#fff">
//                   {service.mainDescription}
//                 </Typography>
//                 <Typography variant="body2" color="#fff" mt={2}>
//                   Price Range: {service.price_range}
//                 </Typography>
//                 <Typography variant="body2" color="#fff">
//                   Availability: {service.availability}
//                 </Typography>
//                 <Typography variant="body2" color="#fff" mt={2}>
//                   Rating:
//                   <Rating name="rating" value={service.rating} precision={0.5} readOnly />
//                 </Typography>
//                 <Button size="large" sx={{ color: '#000', bgcolor: '#ff80e8', p: 1.5, m: 2, boxShadow: 3, mt: 3 ,float:'right'}}>Book Now</Button>
//               </CardContent>
              
//         </Card>
//         : null
//         } 
//       </Container>
//       <Footer />
//     </Grid>
//   );
// }

// export default ServiceDetails;



"use client"
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, Rating } from '@mui/material';
import Header from '@/app/components/Header/page';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const ServiceDetails = () => {
  const router = useRouter();
  const { title } = useParams();
  const [service, setService] = useState(null);
  const [image, setImage] = useState(null);

  const filterData = [
    { "title": "DJ and Music Services", param: 'DJandMusicServices' },
    { "title": "Party Services", param: 'PartyServices' },
    { "title": "Cocktail and Beverage Services", param: "CocktailandBeverageServices" },
    { "title": "Photo and Video Services", param: 'PhotoandVideoServices' },
    { "title": "Decoration and Theming", param: "DecorationandTheming" },
    { "title": "Food and Catering Services", param: "FoodandCateringServices" },
    { "title": "Entertainment Services", param: "EntertainmentServices" },
    { "title": "Corporate Event Services", param: "CorporateEventServices" },
    { "title": "Wedding Services", param: "WeddingServices" },
    { "title": "Logistics and Support", param: "LogisticsandSupport" },
  ];

  useEffect(() => {
    // Fetch service details
    fetch('http://localhost:3001/services')
      .then(response => response.json())
      .then(data => {
        const filteredTitle = filterData.filter((data) => data.param === title)[0].title;
        if (data.length > 0) {
          const serviceData = data.filter((data) => data.title === filteredTitle)[0];
          setService(serviceData);

          // Fetch image from Unsplash API
          fetch(`https://api.unsplash.com/search/photos?query=${filteredTitle}&client_id=kuXavetTq1yeCMUGS0BWOKRFc26Oz1-_V2APCabKgz8`)
            .then(response => response.json())
            .then(data => {
              if (data.results && data.results.length > 0) {
                setImage(data.results[0].urls.regular);
              } else {
                console.error('No images found for:', filteredTitle);
              }
            })
            .catch(error => console.error('Error fetching image:', error));
        }
      })
      .catch(error => console.error('Error fetching service details:', error));
  }, [title]);
  const handleBookingClick = () => {
    router.push(`/pages/services/booking?title=${encodeURIComponent(service.title)}`);
  };
  
  return (
    <Grid sx={{ bgcolor: '#231b3b', width: '100%', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <Header />
      <Container>
        {service ? (
          <Card sx={{ maxWidth: 800, margin: 'auto', boxShadow: 3, bgcolor: '#231b3b', border: 0.5, borderColor: '#4e4861', borderRadius: 5 }}>
            <CardMedia
              sx={{ height: 400 }}
              image={image || 'https://via.placeholder.com/800x400'}
              title={service.title}
              priority={true}
            />
            <CardContent>
              <Typography variant="h4" component="div" color="#fff" gutterBottom>
                {service.title}
              </Typography>
              <Typography variant="body1" color="#fff">
                {service.mainDescription}
              </Typography>
              <Typography variant="body2" color="#fff" mt={2}>
                Price Range: {service.price_range}
              </Typography>
              <Typography variant="body2" color="#fff">
                Availability: {service.availability}
              </Typography>
              <Typography variant="body2" color="#fff" mt={2}>
                Rating:
                <Rating name="rating" value={service.rating} precision={0.5} readOnly />
              </Typography>
              {/* <Link href={`/pages/services/booking?title=${encodeURIComponent(service.title.replace(/\s+/g, ''))}`} passHref>
              <Button size="large" sx={{ color: '#000', bgcolor: '#ff80e8', p: 1.5, m: 2, boxShadow: 3, mt: 3 }}>Book Now</Button>
            </Link> */}
             <Button
              size="large"
              sx={{ color: '#000', bgcolor: '#ff80e8', p: 1.5, m: 2, boxShadow: 3, mt: 3 }}
              onClick={handleBookingClick}
            >
              Book Now
            </Button>
            </CardContent>
          </Card>
        ) : <Typography variant="h5" color="#fff">Loading...</Typography>}
      </Container>
      <Footer />
    </Grid>
  );
}

export default ServiceDetails;
