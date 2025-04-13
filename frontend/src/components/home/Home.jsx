import React from 'react'
import HeroSection from './HeroSection'
import ProductSection from './ProductSection'
import About from './About'
import Testimonial from './Testimonial'
import Feedback from './Feedback'

const Home = () => {
  return (
   <>
   <HeroSection/>
   <About/>
   <ProductSection/>
  <Testimonial/>
  <Feedback/>
</>
  )
}

export default Home