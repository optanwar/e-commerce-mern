import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnnouncementBar from "./layout/AnnouncementBar";
import Loader from "./layout/Loader";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { route } from "./routes";
import axiosInstance from './axios/axiosInstance'
import { useSelector } from "react-redux";


const App = () => {
const [stripeApiKey, setStripeApiKey] = useState("");
  const { token } = useSelector((state) => state.auth);


  useEffect(() => {
  if (!token) return; // do nothing if token hasn't rehydrated

  async function fetchKey() {
    try {
      const response = await axiosInstance.get("/stripeapikey", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStripeApiKey(response.data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe key:", error);
    }
  }

  fetchKey();
}, [token]);
console.log("stripeApiKey:", stripeApiKey);

  

  return (
    <div>
      <Router>
   {/* Announcement Bar */}
      <AnnouncementBar/>
        {/* Navbar */}
        <Navbar />

        {/* Route Configuration */}
        <Suspense fallback={<div><Loader /></div>}>
          <Routes>
            {route.map(({ id, path, component: Component }) => (
              <Route key={id} path={path} element={<Component />} />
            ))}
          </Routes>
        </Suspense>
        <Footer/>
      </Router>
    </div>
  );
};

export default App;
