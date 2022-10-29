import React, {  useEffect } from 'react';
import './app.css';
const App = () => {
  useEffect(() => {
   console.log(`vite-react-cil`);
  }, []);

  return (
 <div>
   <h2>Welcome to vite-react-cil</h2>
 </div>
  );
};

export default App;