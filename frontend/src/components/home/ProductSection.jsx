import React from 'react'

const ProductSection = () => {
  return (
    <div>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row items-center md:items-start justify-between py-16 '>
          <div><h3>Featured Products</h3></div>
          <div>
            <button>All Projects</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSection