const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

mongoose.connect('mongodb://localhost:27017/notiteApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectat la Firebase'))
.catch((err) => console.error('Eroare conectare Firebase:', err));

// Model Mongoose
const Note = mongoose.model('Note', {
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Rute

// Obține toate notițele
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Eroare la preluarea notițelor' });
  }
});

// Creează o notiță nouă
app.post('/notes', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Titlu și descriere sunt obligatorii' });
    }

    const note = new Note({ title, description });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: 'Eroare la salvarea notiței' });
  }
});

// Actualizează o notiță
app.put('/notes/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Titlu și descriere sunt obligatorii' });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: 'Notița nu a fost găsită' });
    }

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: 'Eroare la actualizarea notiței' });
  }
});

// Șterge o notita
app.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Notița nu a fost găsită' });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Eroare la ștergerea notiței' });
  }
});

// Pornim serverul
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
