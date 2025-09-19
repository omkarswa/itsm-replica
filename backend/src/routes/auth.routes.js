import express from "express";
import { signup, signin, profile } from "../controllers/auth.controller.js";
import protect from "../middlewares/authMiddleware.js";




const router = express.Router();

/**
 * @openapi
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 * 
 *     requestBody:
 *       required: true    
 * 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, hr, manager, employee]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing fields / Email already registered
 */
router.post("/signup", signup);

/**
 * @openapi
 * /signin:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post("/signin", signin);

/**
 * @openapi
 * /profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", protect, profile);

export default router;





