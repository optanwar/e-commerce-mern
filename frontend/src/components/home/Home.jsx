import React from 'react'
import HeroSection from './HeroSection'
import ProductSection from './ProductSection'
import TestimonialSection from './Testimonial'
import MetaData from '../../layout/MetaData'

const Home = () => {
  return (
 <>
 <MetaData title={'Buy Best Products Online'}/>
 <HeroSection/>
 <ProductSection/>
 <TestimonialSection/>

 </>
  )
}

export default Home