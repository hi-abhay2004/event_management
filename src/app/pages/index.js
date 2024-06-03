
import Header from '../components/Header';
import EventList from '../components/EventList';
import Footer from '../components/Footer';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import backgroudImage from './11062b_ee1766cb74d34e2280e2b3c063a15b28~mv2.jpg'
import Typography from '@mui/material/Typography'
import { Box, Button, Divider } from '@mui/material';

const services = [
  { name: 'Service 1', price: '$600' },
  { name: 'Service 2', price: '$700' },
  { name: 'Service 3', price: '$800' }
];
export default function Home() {
  return (
    <Grid sx={{ width: '100%', height: '136vh', bgcolor: '#483778' }}>
      <Grid container>
        <Image
          src={backgroudImage}
          width={760}
          height={1000}
          alt="Picture of the author"
        />
        <Header />
        <Grid item sx={{ mt: 40, color: '#fff', width: 400, textAlign: 'center', ml: 10 }} >
          <Typography variant="h6" >Unforgettable Events</Typography>
          <Typography variant="h2">We Make Your Dreams Come True</Typography>
          <Button variant="outlined" size="large" sx={{ bg: '#231b3b', color: '#ff80e8', borderColor: '#ff80e8', border: 1, borderRadius: 10, mt: 5 }}>
            Learn More
          </Button>
        </Grid>
      </Grid>

      <Grid container sx={{ bgcolor: '#231b3b' }}>
        <Grid sx={{ m: 4, ml: 10 }}>


          {/* booking servies startes here  */}
          <Grid>
            <Typography variant="h2" sx={{ color: '#fff' }}>Book Our Services</Typography>
            {services.map((service, index) => (
              <Grid item key={index}>
                <Divider sx={{ width: 1350, bgcolor: '#fff', borderBottomWidth: 2, my: 4 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h5" color="#fff" sx={{ fontWeight: 100 }}>{service.name}</Typography>
                  <Typography variant="h5" color="#fff">{service.price}</Typography>
                  <Button variant="outlined" size="medium" sx={{ bg: '#231b3b', color: '#ff80e8', borderColor: '#ff80e8', border: 1 }}>
                    Buy Now
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
          {/* about us starts here  */}
          <Typography variant="h3" color="#fff" sx={{ mt: 20 }}>About Us</Typography>
          <Grid item sx={{ m: 5 ,display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
            <Image
              src={backgroudImage}
              width={300}
              height={300}
              alt="Picture of the author"
            />
            <Typography variant="body2" color="#fff" sx={{ mt:5,mr:15}}>
                At A&C Events, we believe that every event is <br />
              special and deserves to be unique. That's why <br />
              we offer a wide range of services to make your <br />
              event unforgettable. Our team of experts will <br />
              work with you to create a customized plan that <br />
              meets all of your needs and exceeds your <br />
              expectations. Contact us today to start <br />
              planning your perfect event.
            </Typography>

          </Grid>
            <Button variant="outlined" size="large" sx={{ bg: '#231b3b', color: '#ff80e8', borderColor: '#ff80e8', border: 1, borderRadius: 10,float:'right',mr:30,mb:5}}>
            read More
          </Button>
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </Grid>
  );
}
