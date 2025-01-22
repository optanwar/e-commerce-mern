
import { useEffect } from 'react'
import './App.css'
import WebFont from 'webfontloader'
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
   
   <h1 className="text-3xl font-bold underline text-red-500">
      Hello world!
    </h1>
    </>
  )
}

export default App
