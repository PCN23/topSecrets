const { Router } = require('express');
const { Secret } = require('../models/Secret');

module.exports = Router().get('/', async (req, res) => {
  const secret = await Secret.insert(req.body);
  res.json(secret);
});
