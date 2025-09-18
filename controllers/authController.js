import User from "../models/user.js";
import jwt from "jsonwebtoken";

                    // Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, "your_jwt_secret", { expiresIn: "1h" });
};

                                           // Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  });
};
