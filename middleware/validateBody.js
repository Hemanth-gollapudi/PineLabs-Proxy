module.exports = (requiredFields = []) => {
  return (req, res, next) => {
    const body = req.body || {};

    const missing = requiredFields.filter(field => !(field in body));

    if (missing.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missing
      });
    }

    next();
  };
};