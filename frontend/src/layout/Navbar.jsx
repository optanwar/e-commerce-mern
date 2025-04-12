import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className='container mx-auto'>
        <nav>
          
            <div className="flex justify-between items-center py-4">
              <div className="text-2xl font-bold text-primary">MyWebsite</div>
              <ul className="flex space-x-6">
                <li><a href="#home" className="text-gray-700 hover:text-primary">Home</a></li>
                <li><a href="#about" className="text-gray-700 hover:text-primary">About</a></li>
                <li><a href="#services" className="text-gray-700 hover:text-primary">Services</a></li>
                <li><a href="#contact" className="text-gray-700 hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div className="flex justify-end items-center py-4">
              <button className="bg-primary text-white px-4 py-2 rounded">Where to buy</button>
            
              </div>
          
        </nav>
      </div>
    </div>
  )
}

export default Navbar