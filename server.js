const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const apiKey = '16cd62b7e752472586a561b2daab6ac9';
const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=';

app.get('/news', async (req, res) => {
  const category = req.query.category || 'general';
  try {
    const response = await axios.get(`${apiUrl}${category}&apiKey=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
