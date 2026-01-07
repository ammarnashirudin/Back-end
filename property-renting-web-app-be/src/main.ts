import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PORT } from './configs/env.configs.js';

const app = express();

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})