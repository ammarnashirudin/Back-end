import express from "express";
import errorMiddleware from "./middlewares/error.middlewares.js";
import cors from "cors";
import helmet from "helmet";
import PropertyRouter from "./routers/property.routers.js";
import roomsRouter from "./routers/room.routers.js";
import availabilityRouter from "./routers/availability.controller.js";
import peakSeasonRateRouter from "./routers/peakSeasonRate.routers.js";
import authRouter from "./routers/auth.routers.js";
import loginRouter from "./routers/login.routers.js";
import verifyRouter from "./routers/verify.routers.js";

import { PORT } from "./configs/env.configs.js";


const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes

app.use("/properties", PropertyRouter);
app.use("/rooms", roomsRouter);
app.use("/availabilityRoom", availabilityRouter);
app.use("/peakSeasonRate", peakSeasonRateRouter);
app.use("/auth", authRouter);
app.use("/login", loginRouter);
app.use("/verify", verifyRouter);

//error Middlewares
app.use(errorMiddleware);


// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});