import React from 'react'
import Welcome from './Welcom'
import Product from './Product'
import MetaData from '../../layout/MetaData';
const Home = () => {
  return (
  <>
  <MetaData title="EcoCommerce" />
  <Welcome/>
    <Product/>
  </>
  )
}

export default Home