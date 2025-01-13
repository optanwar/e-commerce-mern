import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Home from './components/home/Home';
import ProductDetails from './components/products/ProductDetails';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import Products from './components/products/Products';


function App() {
  useEffect(() => {
    WebFont.load({
      google: { families: ['Roboto', 'Helvetica', 'Arial'] },
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
