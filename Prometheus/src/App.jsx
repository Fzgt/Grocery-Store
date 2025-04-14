import './App.css'
import { Navbar, Category, Products, Footer, Cart, Messages, DeliveryDetails, OrderSuccess } from './components/export.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from './store/atoms';
import { loadCartFromStorage } from './utils/cartUtils';

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

const Layout = ({ children }) => {
  const location = useLocation();
  const hideCategories = ['/cart', '/delivery', '/messages', '/order-success'].includes(location.pathname);

  if (hideCategories) {
    return <div style={{ padding: '16px', backgroundColor: '#121212' }}>{children}</div>;
  }

  return (
    <div style={{ padding: '16px', backgroundColor: '#121212' }}>
      <div className="home-grid">
        <div className="category-container">
          <Category />
        </div>
        <div className="products-container">
          {children}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [, setCart] = useAtom(cartAtom);

  // Load cart from localStorage on initial app load
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart) {
      setCart(savedCart);
    }
  }, [setCart]);

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
            <Route path="/messages" element={
              <Layout>
                <Messages />
              </Layout>
            } />
            <Route path="/cart" element={
              <Layout>
                <Cart />
              </Layout>
            } />
            <Route path="/delivery" element={
              <Layout>
                <DeliveryDetails />
              </Layout>
            } />
            <Route path="/order-success" element={
              <Layout>
                <OrderSuccess />
              </Layout>
            } />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App