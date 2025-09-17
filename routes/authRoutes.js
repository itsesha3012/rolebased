import express from "express";
import { login } from "../controllers/authController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Login route
router.post("/login", login);

// Sample protected routes
router.get("/admin-only",  authorizeRoles("Admin"), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}` });
});

router.get("/merchant-only",  authorizeRoles("Merchant"), (req, res) => {
  res.json({ message: `Welcome Merchant ${req.user.name}` });
});

router.get("/user-only", authorizeRoles("User"), (req, res) => {
  res.json({ message: `Welcome User ${req.user.name}` });
});

export default router;
