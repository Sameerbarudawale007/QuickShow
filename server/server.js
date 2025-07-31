import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./innggest/index.js";
import showRouter from "./Routes/showRoute.js";
import bookingRouter from "./Routes/bookingRoutes.js";
import adminRouter from "./Routes/adminRoutes.js";
import userRouter from "./Routes/userRoutes.js";

const app = express();
const port = 3000;

await connectDB();

app.use(clerkMiddleware());
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send(`Server is runing on ${port}`);
});
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
