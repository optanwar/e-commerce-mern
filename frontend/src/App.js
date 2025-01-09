import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Home from './components/home/Home';
import WebFont from 'webfontloader';
import { useEffect } from 'react';


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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
