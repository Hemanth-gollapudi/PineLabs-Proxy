require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const pineRoutes = require('./routes/pineRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', pineRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'PineLabs Proxy is running.' });
});

// global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
