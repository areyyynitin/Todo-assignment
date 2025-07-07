import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "qwerty4321";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
   console.log("Auth Header:", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, auth denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET || "qwerty4321");
      console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
     console.error("JWT Error:", error.message);
    res
      .status(401)
      .json({ Message: "Access denied please enter correcct token" });
  }
};
