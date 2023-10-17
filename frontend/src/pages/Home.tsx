import { Box, CssBaseline } from '@mui/material';
import PrimaryAppBar from './template/PrimaryAppBar';
import PrimaryDraw from './template/PrimaryDraw';

const Home = () => {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        
      </PrimaryDraw>
      Home
    </Box>
  )
}
export default Home
