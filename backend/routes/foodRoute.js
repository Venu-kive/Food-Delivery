import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /food/add:
 *   post:
 *     summary: Add a food item
 *     description: Add a new food item to the menu.
 *     tags:
 *       - Food
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Food item added successfully.
 *       400:
 *         description: Bad request.
 */
foodRouter.post("/add", upload.single("image"), authMiddleware, addFood);

/**
 * @swagger
 * /food/list:
 *   get:
 *     summary: List all food items
 *     description: Retrieve a list of all food items in the menu.
 *     tags:
 *       - Food
 *     responses:
 *       200:
 *         description: A list of food items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       category:
 *                         type: string
 *                       image:
 *                         type: string
 *       400:
 *         description: Bad request.
 */
foodRouter.get("/list", listFood);

/**
 * @swagger
 * /food/remove:
 *   post:
 *     summary: Remove a food item
 *     description: Remove a food item from the menu.
 *     tags:
 *       - Food
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the food item to remove.
 *     responses:
 *       200:
 *         description: Food item removed successfully.
 *       400:
 *         description: Bad request.
 */
foodRouter.post("/remove", authMiddleware, removeFood);

export default foodRouter;

