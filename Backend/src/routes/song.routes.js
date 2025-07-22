const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../service/storage.service');
const router = express.Router();
const songModel = require("../models/song.model");

const upload = multer({ storage: multer.memoryStorage() });

router.post('/songs', upload.single("audio"), async (req, res) => {
    try {
        console.log("🎯 BODY:", req.body);
        console.log("📁 FILE:", req.file);

        if (!req.file) {
            console.log("❌ File not received");
            return res.status(400).json({ error: "No file uploaded" });
        }

        const fileData = await uploadFile(req.file);
        console.log(" Uploaded to ImageKit:", fileData);

        const song = await songModel.create({
            title: req.body.title,
            artist: req.body.artist,
            audio: fileData.url,
            mood: req.body.mood
        });

        console.log("Song saved to DB:", song);

        res.status(201).json({
            message: 'Song created successfully',
            song
        });

    } catch (err) {
        console.error("🔥 Upload Error:", err);
        res.status(500).json({ error: "Song upload failed", details: err.message });
    }
});

router.get('/audio', async (req, res) => {
    try {
        const { mood } = req.query;

        const songs = await songModel.find({ mood });

        res.status(200).json({
            message: "Songs fetched successfully",
            songs
        });
    } catch (err) {
        console.error("Fetch Error:", err);
        res.status(500).json({ error: "Failed to fetch songs", details: err.message });
    }
});

module.exports = router;
