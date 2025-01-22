import { useEffect } from 'react';
import './App.css';
import WebFont from 'webfontloader';

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto:300,400,500,700', 'sans-serif']
      }
    });
  });
  return (
    <div className="text-red-600">
      
      <h1 className="text-4xl">Hello World</h1>
    </div>
  );
}

export default App;
