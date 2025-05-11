import React from 'react';
import Loading from './components/Loading';
import MainScreen from './components/mainScreen'; // Corrected import path casing

function App() {
  return (
    <>
      <Loading />
      <MainScreen />
      {/* Add more content here to ensure scrolling is possible if MainScreen is not tall enough */}
      <div style={{ height: '100vh' }}></div> {/* Placeholder for scrollable content */}
      <div style={{ height: '100vh' }}></div> {/* Placeholder for scrollable content */}
    </>
  );
}

export default App;