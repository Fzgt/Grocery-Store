import './App.css'
import { Navbar, Category, Products, Footer } from './components/index.jsx';
import { Box } from '@radix-ui/themes';


const App = () => {
  return (
    <Box style={{ minHeight: '100vh' }}>
      <Navbar />
      <Category />
      <Products />
      <Footer />
    </Box>
  )
}

export default App
