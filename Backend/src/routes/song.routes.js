import express from 'express';
import multer from 'multer';
import uploadfile from '../service/storage.service.js'; 
import songModel from '../models/song.model.js';

const router = express.Router();


const upload = multer({ storage: multer.memoryStorage() });


router.post('/songs', upload.single("audio"), async (req, res) => {
  try {
    const fileData = await uploadfile(req.file);
    const song = await songModel.create({
      title: req.body.title,
      artist: req.body.artist,
      audio: fileData.url,   
      mood: req.body.mood
    });

    res.status(201).json(song);  
  } catch (error) {
    res.status(500).json({ message: 'Error adding song', error });
  }
});

router.get('/songs', async (req, res) => {
  try {
    const { mood } = req.query;
    const filter = mood ? { mood } : {};
    const songs = await songModel.find(filter);

    res.status(200).json(songs);   
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs", error });
  }
});


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
