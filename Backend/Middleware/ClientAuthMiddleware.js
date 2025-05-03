// authMiddleware.js
const jwt = require("jsonwebtoken");

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ user }, "client-secret-key", { expiresIn: "30m"});
};

// Middleware to verify the user's JWT token
const verifyToken = (userType) => (req, res, next) => {
  let token = req.header("Authorization");
  // console.log("tttttttttttttttttttt",token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  // Remove the "Bearer " prefix
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
    // console.log("Token gotton from the client :  ",token)
  }

  try {
    const decoded = jwt.verify(token, userType === 'engg' ? "engg-secret-key" : "client-secret-key");
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = { generateToken, verifyToken };
