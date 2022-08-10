const { Router } = require('express');
const { Secret } = require('../models/Secret');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

module.exports = Router().get(
  '/',
  authorize,
  authenticate,
  async (req, res, next) => {
    try {
      const data = await Secret.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
);
