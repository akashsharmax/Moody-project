import { useState } from 'react';
import FacialExpression from './components/FacialExpression';
import MoodSongs from './components/MoodSongs';
import './App.css';
import './components/MoodSongs.css'; // ✅ ADD THIS

function App() {
  const [Songs, setSongs] = useState([]);

  return (
    <>
      <FacialExpression setSongs={setSongs} />
      <MoodSongs Songs={Songs} />
    </>
  );
}

export default App;
