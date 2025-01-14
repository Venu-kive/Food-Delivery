import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import authMiddleware from "../middleware/auth.js";
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

/**
 * @swagger
 * /order/place:
 *   post:
 *     summary: Place an order
 *     description: Place an order for a user
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               amount:
 *                 type: number
 *               address:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   address:
 *                     type: string
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       400:
 *         description: Bad request
 */
orderRouter.post("/place", authMiddleware, placeOrder);

/**
 * @swagger
 * /order/verify:
 *   post:
 *     summary: Verify payment
 *     description: Verify payment for an order
 *     tags:
 *       - Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               success:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       400:
 *         description: Bad request
 */
orderRouter.post("/verify", verifyOrder);

/**
 * @swagger
 * /order/status:
 *   post:
 *     summary: Update order status
 *     description: Update order status for an order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Bad request
 */
orderRouter.post("/status", authMiddleware, updateStatus);

/**
 * @swagger
 * /order/userorders:
 *   post:
 *     summary: Get user orders
 *     description: Get orders for a user
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         itemId:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                   amount:
 *                     type: number
 *                   address:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       address:
 *                         type: string
 *                   status:
 *                     type: string
 *                   payment:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       400:
 *         description: Bad request
 */
orderRouter.post("/userorders", authMiddleware, userOrders);

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: List all orders
 *     description: List all orders
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         itemId:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                   amount:
 *                     type: number
 *                   address:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       address:
 *                         type: string
 *                   status:
 *                     type: string
 *                   payment:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       400:
 *         description: Bad request
 */
orderRouter.get("/list", authMiddleware, listOrders);

export default orderRouter;
