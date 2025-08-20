import express from 'express';
import songRoutes from './routes/song.routes.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});


app.use('/api', songRoutes);

export default app;