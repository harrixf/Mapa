import React, { useEffect, useState } from 'react';
import ParallaxSection from './components/ParallaxSection.jsx';
import Timeline from './components/Timeline.jsx';
import './App.css'; // Asegúrate de importar los estilos
import './styles/ParallaxSection.css';  // Estilos para ParallaxSection
import './styles/Timeline.css';  // Estilos para Timeline

function App() {
  const [timelineCompleted, setTimelineCompleted] = useState(false);

  const handleTimelineEnd = () => {
    console.log('Timeline completada, activando Despedida');
    setTimelineCompleted(true); // Cambiar el estado cuando la línea de tiempo termina
  };

  return (
    <div>
      <ParallaxSection />
      <Timeline />
    </div>
  );
}

export default App;
