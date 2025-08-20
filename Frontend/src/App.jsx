import React, { useState } from 'react';
import FaceExpression from './components/FaceExpression';
import SongList from './components/SongList';

const App = () => {
  const [songs, setSongs] = useState([
    {
      title: "test_title",
      artist: "test_artist",
      audio: "https://example.com/song.mp3",  
    },
    {
      title: "test_title",
      artist: "test_artist",
      audio: "https://example.com/song.mp3",
    },
    {
      title: "test_title",
      artist: "test_artist",
      audio: "https://example.com/song.mp3",
    }
  ]);

  return (
    <div>
      <FaceExpression setSongs={setSongs} />
      {}
      <SongList songs={songs} />
    </div>
  );
};

export default App;
