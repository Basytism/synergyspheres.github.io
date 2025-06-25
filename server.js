// === STEP 1: Create a directory ===
// Open terminal and run:
// mkdir synergy-uploader && cd synergy-uploader

// === STEP 2: Create a file called `server.js` ===

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  try {
    const response = await axios.post(
      'https://storacha.network/api/upload',
      {
        file: req.file.buffer.toString('base64'),
        filename: req.file.originalname,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STORACHA_API_KEY}`,
        },
      }
    );

    res.json({ url: response.data.url });
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed.');
  }
});

app.listen(port, () => {
  console.log(`Uploader server running at http://localhost:${port}`);
});


// === STEP 3: Create a file called `.env` ===
// Paste this inside:
// STORACHA_API_KEY=z6MkpL1do2E97nVAfMwGx4AM1uNdr4kUVPb8tHJ4Sjr3ssYo


// === STEP 4: Create `package.json` ===
// Run this in terminal:
// npm init -y

// Then install dependencies:
// npm install express multer axios cors dotenv


// === STEP 5: Run the server ===
// node server.js


// === STEP 6: Connect this to your HTML Form ===
/*
<form action="http://localhost:3000/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="file" required />
  <button type="submit">Upload</button>
</form>
*/
