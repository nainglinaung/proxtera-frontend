import logo from './logo.svg';
import './App.css';
import Index from './pages';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
       <Grid container spacing={5}>
       <Grid item xs={8}>
          <Item><Index /></Item>
        </Grid>
       
    
       </Grid>
    </Box>
   
  );
}

export default App;
