import React from "react";

const SongList = ({ songs }) => {
  
  console.log(songs);

  return (
    <div className="mt-10 flex flex-col items-center">
      {songs.length > 0 ? (
        songs.map((song) => (
          <div key={song._id} className="mb-6 text-center">
            <p className="text-lg font-semibold">
              {song.title} - {song.artist} ({song.mood})
            </p>
            {}
            <audio
              key={song._id}
              controls
              className="mt-2"
            >
              <source src={song.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No songs available for this mood.</p>
      )}
    </div>
  );
};

export default SongList;
