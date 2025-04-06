import './App.css'
import { Navbar, Category, Products, Footer, Cart, Messages, Login } from './components/export.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 主页组件
const HomePage = () => (
  <div style={{ padding: '16px', backgroundColor: '#121212' }}>
    <div className="home-grid">
      <div className="category-container">
        <Category />
      </div>
      <div className="products-container">
        <Products />
      </div>
    </div>
  </div>
)

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', 
        backgroundColor: '#121212'
      }}>
        <Navbar />
        
        <div style={{ flex: '1 0 auto' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:id" element={<Messages />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App