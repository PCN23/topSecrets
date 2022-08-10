module.exports = async (req, res, next) => {
  try {
    if (!req.user)
      throw new Error('Access denied');
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
