import jwt from "jsonwebtoken" ;
// import User from "../models/auth.model.js";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey" ;


export default async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Not authorized" });

    const token = authHeader.split(" ")[1];
    console.log("Token received:", token);

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(" Token decoded payload:", decoded);

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Not authorized - token invalid or expired" });
  }
}
