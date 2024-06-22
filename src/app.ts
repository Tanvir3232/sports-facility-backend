
import cors from "cors";
import express, { Application } from 'express';

import router from "./app/routes";
const app: Application = express();

// Parsers
app.use(express.json());

app.use(cors());

// Application routes
app.use('/api/', router);


export default app;
