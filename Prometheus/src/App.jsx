import './App.css'
import { Navbar, Category, Products, Footer } from './components/export.js';
import { Box, Grid } from '@radix-ui/themes';


const App = () => {
  return (
    <Box style={{ minHeight: '100vh' }}>
      <Navbar />

      <Box p="4">
        <Grid columns={{ initial: '1', md: '4' }} gap="4">
          <Box style={{ gridColumn: 'span 1' }}>
            <Category />
          </Box>
          <Box style={{ gridColumn: 'span 3' }}>
            <Products />
          </Box>
        </Grid>
      </Box>

      <Footer />
    </Box>
  )
}

export default App