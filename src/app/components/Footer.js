import { Box, Divider, Grid, Typography } from "@mui/material";

const Footer = () => {
    return (
      <Grid sx={{color:'#fff',height:'40vh',width:'100%',display:'flex',justifyContent:'space-around',mt:20}}>
      {/* <footer> */}
      <Box>
      <Typography variant="h4" sx={{ml:5}}>C&A Events</Typography>
        </Box>
        <Typography sx={{mt:30,textAlign:'center'}}>&copy; 2024 Event Management</Typography>
      {/* </footer> */}
      <Box sx={{float:'right'}}>
        <Typography variant="body1" >8050698868 / 9538114942</Typography>
        <Typography variant="body1" >CAEvents@gmail.com</Typography>
        <Typography variant="body1" ></Typography>
        <Typography variant="body1" >Banglore</Typography>


      </Box>
      </Grid>
    );
  };
  
  export default Footer;
  