import Header from '../components/Header/page';
import Footer from '../components/Footer';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import backgroudImage from '../assets/11062b_ee1766cb74d34e2280e2b3c063a15b28~mv2.jpg';
import img1 from '../assets/01.jpg';
import img2 from '../assets/02.jpg';
import img3 from '../assets/03.jpeg';
import logo from '../assets/Logo (1).png';
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
import twitterIcon from '../assets/twitter.png';
import Typography from '@mui/material/Typography';
import { Box, Button, Divider, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import VideoPlayer from '../components/vedioPlayer/page';
import { useAuth } from '../context/authContext/page';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { login, isLoggedIn } = useAuth();
  const [services, setServices] = useState([]);
  const router = useRouter();
  const [socialImages, setSocialImages] = useState({});


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/services');
        setServices(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const handleBookNow = () => {
    if (isLoggedIn) {
      // Redirect to booking page
      console.log('User is authenticated. Proceed to booking.');
      router.push('/pages/services')
    } else {
      router.push('/pages/login')
    }
  };
  useEffect(() => {
    const fetchSocialImages = async () => {
      try {
        const eventQueries = ['wedding', 'corporate event', 'private party'];
        const promises = eventQueries.map(query =>
          axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=kuXavetTq1yeCMUGS0BWOKRFc26Oz1-_V2APCabKgz8`)
        );
        const results = await Promise.all(promises);
        const images = results.reduce((acc, result, index) => {
          acc[eventQueries[index]] = result.data.results[0].urls.small;
          return acc;
        }, {});
        setSocialImages(images);
      } catch (error) {
        console.error('Error fetching social images:', error);
      }
    };
    fetchSocialImages();
  }, []);
  const handleSocialMediaClick = (url) => {
    window.open(url, '_blank');
  };
  return (
    <Grid sx={{ width: '100%', height: '136vh', bgcolor: '#483778' }}>
      <Grid container>
        <Image
          src={backgroudImage}
          width={800}
          height={1000}
          alt="Background Image"
          priority={true}
        />
        <Header />
        <Grid item sx={{ mt: 38, color: '#fff', width: 400, textAlign: 'center', ml: 20 }} >
          <Image
            src={logo}
            width={400}
            height={150}
            alt="logo"
          />
          <Typography variant="h6">Unforgettable Events</Typography>
          <Typography variant="h2">We Make Your Dreams Come True</Typography>
          <Button variant="outlined" size="large" sx={{ bg: '#231b3b', color: '#ff80e8', borderColor: '#ff80e8', border: 1, borderRadius: 10, mt: 5 }}>
            Learn More
          </Button>
        </Grid>
      </Grid>

      <Grid container sx={{ bgcolor: '#231b3b' }}>
        <Grid sx={{ m: 4, ml: 20 }}>
          <Grid>
            <Typography variant="h2" sx={{ color: '#fff' }}>Book Our Services</Typography>
            {services.map((service, index) => (
              <Grid item key={index}>
                <Divider sx={{ width: 1350, bgcolor: '#fff', borderBottomWidth: 2, my: 4 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h5" color="#fff" sx={{}}>{service.title}</Typography>
                  <Typography variant="h5" color="#fff" sx={{}}>{service.price_range}</Typography>
                  <Button
                    variant="outlined"
                    size="medium"
                    sx={{ bg: '#231b3b', color: '#ff80e8', borderColor: '#ff80e8', border: 1 }}
                    onClick={handleBookNow}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h3" color="#fff" sx={{ mt: 20 }}>About Us</Typography>
          <Grid item sx={{ m: 5, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
            <VideoPlayer />
            <Box>
              <Typography variant="h6" color="#fff" sx={{ mr: 15 }}>
                At A&C Events, we believe that every event is <br />
                special and deserves to be unique. That's why <br />
                we offer a wide range of services to make your <br />
                event unforgettable. Our team of experts will <br />
                work with you to create a customized plan that <br />
                meets all of your needs and exceeds your <br />
                expectations. Contact us today to start <br />
                planning your perfect event.
              </Typography>
              <Button variant="outlined" size="large" sx={{ bg: '#231b3b', color: '#ff80e8', borderColor: '#ff80e8', border: 1, borderRadius: 10, float: 'right', mr: 30, mt: 3 }}>
                Read More
              </Button>
            </Box>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3" color="#fff" sx={{ my: 15, display: 'inline-block' }}>Events Highlights</Typography>
            <Typography variant="body1" color="#fff" sx={{ display: 'inline-block' }}>Our Work</Typography>
          </Box>
          <Grid item sx={{ display: 'flex', justifyContent: 'space-around', color: '#fff' }}>
            <Grid sx={{ width: 320 }}>
              <Image
                src={img1}
                width={350}
                height={500}
                alt="Corporate Events"
              />
              <Typography variant="h3" color="#fff" sx={{ my: 3 }}>Corporate Events</Typography>
              <Typography variant="h6" color="#fff">We have successfully organized numerous corporate events that have been a great success. Our attention to detail, creativity and professionalism have helped us to create unique and memorable experiences for our clients.</Typography>
            </Grid>
            <Grid sx={{ width: 320 }}>
              <Image
                src={img2}
                width={350}
                height={500}
                alt="Weddings"
              />
              <Typography variant="h3" color="#fff" sx={{ my: 3 }}>Weddings</Typography>
              <Typography variant="h6" color="#fff">We understand that your wedding day is one of the most important days of your life. That's why we offer a wide range of services to make your special day unforgettable. From ceremony music to photo booth hire, we've got you covered.</Typography>
            </Grid>
            <Grid sx={{ width: 320 }}>
              <Image
                src={img3}
                width={350}
                height={500}
                alt="Private Parties"
              />
              <Typography variant="h3" color="#fff" sx={{ my: 3 }}>Private Parties</Typography>
              <Typography variant="h6" color="#fff">Whether you're planning a birthday party, anniversary celebration, or any other type of private event, we've got you covered. Our team of experts will work with you to create a customized plan that meets all of your needs and exceeds your expectations.</Typography>
            </Grid>
          </Grid>

          <Typography variant="h3" color="#fff" sx={{ my: 15 }}>Follow Us</Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { name: 'Facebook', query: 'wedding', url: 'https://www.facebook.com',icon:facebookIcon },
              { name: 'Instagram', query: 'corporate event', url: 'https://www.instagram.com' ,icon:instagramIcon},
              { name: 'Twitter', query: 'private party', url: 'https://www.twitter.com',icon:twitterIcon }
            ].map((social, index) => (
              <Grid item key={index}>
                <Card sx={{ maxWidth: 400, bgcolor: '#483778', color: '#fff' }}>
                  <CardActionArea onClick={() => handleSocialMediaClick(social.url)}>
                    <Image
                      src={social.icon}
                      width={200}
                      height={200}
                      alt={social.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}>
                        {/* <Image
                          src={social.icon}
                          width={50}
                          height={50}
                          alt="logo"
                          style={{ marginRight: '10px', width: social.icon === twitterIcon ? '100px' : '50px' , height: social.icon === twitterIcon ? '100px' : '50px' }}
                  /> */}
                      
                        {social.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    </Grid>
  );
}
