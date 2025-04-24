import React from 'react'

const SignUp = () => {
  return (
    <div> <h2 className='text-2xl font-semibold mb-4'>Create Account</h2>
    {/* Replace below with actual signup form */}
    <form>
      <input type="text" placeholder="Name" className="w-full p-2 mb-3 border rounded" />
      <input type="email" placeholder="Email" className="w-full p-2 mb-3 border rounded" />
      <input type="password" placeholder="Password" className="w-full p-2 mb-3 border rounded" />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Sign Up</button>
    </form></div>
  )
}

export default SignUp