const axios = require('axios');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const { ticker } = req.query;
        if (!ticker) {
            return res.status(400).json({ error: 'Parameter ticker diperlukan' });
        }

        const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`;
        const response = await axios.get(yahooUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil data', message: error.message });
    }
};
