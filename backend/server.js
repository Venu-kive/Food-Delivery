import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerConfig.js';

// app config
const app = express();
const port =process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});
