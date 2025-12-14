const admin = require("../admin"); // jahan upar initialize kiya

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Optional: check for admin email
    if (!decodedToken.email.endsWith("@gmail.com")) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    req.admin = decodedToken;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = verifyAdmin;
