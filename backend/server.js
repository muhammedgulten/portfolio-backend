import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// .env dosyasını yükle
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoint
app.post('/send-mail', async (req, res) => {
  const { name, email, message } = req.body;
  const apiKey = process.env.WEB3FORMS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not found' });
  }

  try {
    // Web3Forms API'ye POST isteği gönder
    const response = await axios.post('https://api.web3forms.com/submit', {
      access_key: apiKey,
      name,
      email,
      message,
    });

    if (response.status === 200) {
      res.status(200).json({ success: true, message: 'Mail sent successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Failed to send mail' });
    }
  } catch (error) {
    console.error('Error sending mail via Web3Forms:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
