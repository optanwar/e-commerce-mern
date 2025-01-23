

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { route } from "./routes";
import Navbar from "./layout/Navbar"
import { useEffect } from "react";
import WebFont from "webfontloader";
import Footer from "./layout/Footer";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'sans-serif']
      }
    });
  }, []);
  return (
    <>
      <Router basename="/school">
        <Navbar />
        <Routes>
          {route.map((route) => {
            return (
              <Route
                path={route.path}
                key={route.id}
                element={route.component}
              />
            );
          })}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
