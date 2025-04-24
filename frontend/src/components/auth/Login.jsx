import React from 'react'

const Login = () => {
  return (
    <div><h2 className='text-2xl font-semibold mb-4'>Login</h2>
    {/* Replace below with actual login form */}
    <form>
      <input type="email" placeholder="Email" className="w-full p-2 mb-3 border rounded" />
      <input type="password" placeholder="Password" className="w-full p-2 mb-3 border rounded" />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
    </form></div>
  )
}

export default Login