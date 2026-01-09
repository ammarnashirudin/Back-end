import express from "express";
import cors from "cors";
import helmet from "helmet";

import { PORT } from "./configs/env.configs.js";


const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes

app.use("/properties",);

// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});