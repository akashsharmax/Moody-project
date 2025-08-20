import express from 'express';
import multer from 'multer';
import uploadfile from '../service/storage.service.js'; 
import songModel from '../models/song.model.js';

const router = express.Router();

// Multer in-memory storage
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Add a new song (upload + save in DB)
router.post('/songs', upload.single("audio"), async (req, res) => {
  try {
    const fileData = await uploadfile(req.file);
    const song = await songModel.create({
      title: req.body.title,
      artist: req.body.artist,
      audio: fileData.url,   // ImageKit/Cloud URL
      mood: req.body.mood
    });

    res.status(201).json(song);  // ✅ clean response
  } catch (error) {
    res.status(500).json({ message: 'Error adding song', error });
  }
});

// ✅ Get all songs OR filter by mood (?mood=happy)
router.get('/songs', async (req, res) => {
  try {
    const { mood } = req.query;
    const filter = mood ? { mood } : {};
    const songs = await songModel.find(filter);

    res.status(200).json(songs);   // ✅ only array
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs", error });
  }
});

// ✅ Get a song by ID
router.get('/songs/:id', async (req, res) => {
  try {
    const song = await songModel.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: "Error fetching song", error });
  }
});

// ✅ Delete a song by ID
router.delete('/songs/:id', async (req, res) => {
  try {
    const song = await songModel.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting song", error });
  }
});

// ✅ Update a song by ID
router.put('/songs/:id', async (req, res) => {
  try {
    const { title, artist, mood } = req.body;
    const song = await songModel.findByIdAndUpdate(
      req.params.id,
      { title, artist, mood },
      { new: true }
    );

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: "Error updating song", error });
  }
});

export default router;
