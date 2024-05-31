const express = require('express');
const morgan = require('morgan');
const searchRoutes = require('./src/main/routes/search');
const itemsRoutes = require('./src/main/routes/items');
const authMiddleware = require('./src/main/middlewares/auth');
const loggerMiddleware = require('./src/main/middlewares/logger');
const NodeCache = require('node-cache');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const cache = new NodeCache({ stdTTL: 100, checkperiod: 10 });

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    return res.json(cachedResponse);
  }
  res.originalJson = res.json;
  res.json = (body) => {
    cache.set(key, body);
    res.originalJson(body);
  };
  next();
};

app.use(express.json());
app.use(morgan('dev'));
app.use(authMiddleware);
app.use(loggerMiddleware);

app.use('/api/search', cacheMiddleware, searchRoutes);
app.use('/api/items', cacheMiddleware, itemsRoutes);
app.get('/', (req, res) => res.json({ data: 'ML-Middleend API' }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;