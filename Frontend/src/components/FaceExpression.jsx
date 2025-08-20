import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

const FaceExpression = ({ setSongs }) => {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState('');
  const [emoji, setEmoji] = useState('😐');
  const [topMood, setTopMood] = useState('');

  const emojiMap = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    surprised: '😲',
    fearful: '😱',
    disgusted: '🤢',
    neutral: '😐',
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
    };
    loadModels().then(startVideo);
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Webcam error:', err));
  };

  const handleDetect = async () => {
    if (!videoRef.current) return;

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detection) {
      const sorted = Object.entries(detection.expressions).sort((a, b) => b[1] - a[1]);
      const topExpression = sorted[0][0];
      const confidence = sorted[0][1];

      if (confidence > 0.6) {
        setExpression(topExpression);
        setEmoji(emojiMap[topExpression] || '❓');
        setTopMood(topExpression);
        console.log('Detected Mood:', topExpression);

        // Fetch songs for detected mood
        axios
          .get(`http://localhost:3000/api/songs?mood=${topExpression}`)
          .then((response) => {
            if (response.data && response.data.songs) {
              setSongs(response.data.songs);
            }
          })
          .catch((error) => {
            console.error('Error fetching songs:', error);
          });
      } else {
        setExpression('Unclear');
        setEmoji('❓');
        setTopMood('');
        console.log('Mood unclear');
        setSongs([]); // Optionally clear songs
      }
    } else {
      setExpression('No face');
      setEmoji('❓');
      setTopMood('');
      console.log('No face detected');
      setSongs([]); // Optionally clear songs
    }
  };

  return (
    <div className="relative flex flex-col mt-20 items-center">
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="rounded-lg w-[30rem] object-cover "
        />
      </div>
      <div className="mt-4 text-2xl font-semibold">
        {emoji} Current Expression: {expression || 'Click Detect'}
      </div>
      <button
        onClick={handleDetect}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Detect Mood
      </button>
      <div className="mt-2 text-lg">
        Playing: <strong>{topMood} Songs</strong>
      </div>
    </div>
  );
};

export default FaceExpression;

    