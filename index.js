const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Mengizinkan frontend aplikasi Let's Grow Anda mengakses server ini
app.use(cors());

// Jalur tes untuk memastikan server hidup
app.get('/', (req, res) => {
    res.send('Server Proxy Let\'s Grow Aktif! Sila gunakan endpoint /api/stock/:ticker');
});

// Endpoint utama untuk mengambil data saham dari Yahoo Finance
app.get('/api/stock/:ticker', async (req, res) => {
    try {
        const { ticker } = req.params;
        const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`;
        
        const response = await axios.get(yahooUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        
        // Teruskan data asli dari Yahoo Finance ke frontend Let's Grow
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ 
            error: 'Gagal mengambil data dari Yahoo Finance', 
            message: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
