import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnnouncementBar from "./layout/AnnouncementBar";
import Loader from "./layout/Loader";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { route } from "./routes";
import axiosInstance from './axios/axiosInstance'
import { useSelector } from "react-redux";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [stripePromise, setStripePromise] = useState(stripeApiKey);
  const { token } = useSelector((state) => state.auth);


  useEffect(() => {
  if (!token) return;

  async function fetchKey() {
    try {
      const response = await axiosInstance.get("/stripeapikey", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const key = response.data.stripeApiKey;
      setStripeApiKey(key);
      setStripePromise(loadStripe(key)); // ✅ FIX HERE
    } catch (error) {
      console.error("Error fetching Stripe key:", error);
    }
  }

  fetchKey();
}, [token]);



  return (
    <div>
      <Router>
   {/* Announcement Bar */}
      <AnnouncementBar/>
        {/* Navbar */}
        <Navbar />

        {/* Route Configuration */}
         <Suspense fallback={<div><Loader /></div>}>
          {
            stripePromise ? (
              <Elements stripe={stripePromise}>
                <Routes>
                  {route.map(({ id, path, component: Component }) => (
                    <Route key={id} path={path} element={<Component />} />
                  ))}
                </Routes>
              </Elements>
            ) : (
              <Routes>
                {route.map(({ id, path, component: Component }) => (
                  <Route key={id} path={path} element={<Component />} />
                ))}
              </Routes>
            )
          }
        </Suspense>
        {/* <Suspense fallback={<div><Loader /></div>}>
          <Routes>
            {route.map(({ id, path, component: Component }) => (
              <Route key={id} path={path} element={<Component />} />
            ))}
          </Routes>
        </Suspense> */}
        <Footer/>
      </Router>
    </div>
  );
};

export default App;
