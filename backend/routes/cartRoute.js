import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add item to cart
 *     description: Adds an item to the user's cart.
 *     tags:
 *       - Cart
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID of the item to add to the cart.
 *                 example: "12345"
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the item to add.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item added successfully.
 *       400:
 *         description: Bad request.
 */
cartRouter.post("/add", authMiddleware, addToCart);

/**
 * @swagger
 * /cart/remove:
 *   post:
 *     summary: Remove item from cart
 *     description: Removes an item from the user's cart.
 *     tags:
 *       - Cart
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID of the item to remove from the cart.
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Item removed successfully.
 *       400:
 *         description: Bad request.
 */
cartRouter.post("/remove", authMiddleware, removeFromCart);

/**
 * @swagger
 * /cart/get:
 *   post:
 *     summary: Get cart details
 *     description: Retrieves the items in the user's cart.
 *     tags:
 *       - Cart
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cart details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       itemId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *                       price:
 *                         type: number
 *       400:
 *         description: Bad request.
 */
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
