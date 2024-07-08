import React, { useEffect, useState } from 'react';
import './App.css';
import Shake from 'shake.js';

const colors = [
  '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD',
  '#2ECC71', '#E74C3C', '#3498DB', '#F39C12', '#9B59B6'
];

function App() {
  const [color, setColor] = useState(colors[0]);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const shakeEvent = new Shake({ threshold: 15, timeout: 1000 }); // تنظیم حساسیت و زمان‌بندی

    const handleShakeEvent = () => {
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      setColor(newColor);
      setShake(true);
    };

    shakeEvent.start();
    window.addEventListener('shake', handleShakeEvent);

    return () => {
      shakeEvent.stop();
      window.removeEventListener('shake', handleShakeEvent);
    };
  }, []);

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500); // Remove shake class after animation duration
      return () => clearTimeout(timer);
    }
  }, [shake]);

  return (
    <div className={`App ${shake ? 'shake' : ''}`} style={{ backgroundColor: color, height: '100vh' }}>
      <h1>{color}</h1>
    </div>
  );
}

export default App;











// import React, { useEffect, useState } from 'react';
// import './App.css';

// const colors = [
//   '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD',
//   '#2ECC71', '#E74C3C', '#3498DB', '#F39C12', '#9B59B6'
// ];

// function App() {
//   const [color, setColor] = useState(colors[0]);

//   useEffect(() => {
//     let lastX = null;
//     let lastY = null;
//     let lastZ = null;

//     const handleMotionEvent = (event) => {
//       const acceleration = event.acceleration || event.accelerationIncludingGravity;
//       if (!acceleration) {
//         return;
//       }

//       const { x, y, z } = acceleration;

//       if (lastX !== null && lastY !== null && lastZ !== null) {
//         const deltaX = Math.abs(x - lastX);
//         const deltaY = Math.abs(y - lastY);
//         const deltaZ = Math.abs(z - lastZ);

//         if (deltaX > 1 || deltaY > 1 || deltaZ > 1) {
//           const newColor = colors[Math.floor(Math.random() * colors.length)];
//           setColor(newColor);
//         }
//       }

//       lastX = x;
//       lastY = y;
//       lastZ = z;
//     };

//     window.addEventListener('devicemotion', handleMotionEvent);

//     return () => {
//       window.removeEventListener('devicemotion', handleMotionEvent);
//     };
//   }, []);

//   return (
//     <div className="App" style={{ backgroundColor: color, height: '100vh' }}>
//       <h1>{color}</h1>
//     </div>
//   );
// }

// export default App;
