require('dotenv').config();

module.exports = (req, res, next) => {
  const user = req.headers['x-api-user'];
  const key = req.headers['x-api-key'];

  if (!user || !key) {
    return res.status(401).json({
      error: "Missing authentication headers (x-api-user, x-api-key)"
    });
  }

  if (user !== process.env.API_USER || key !== process.env.API_KEY) {
    return res.status(403).json({
      error: "Invalid authentication credentials"
    });
  }

  next();
};
