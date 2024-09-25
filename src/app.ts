import cors from "cors";
import express, { Application, Request, Response } from 'express';

import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();

// Parsers
app.use(express.json());

app.use(cors({ origin: ['http://localhost:5173', 'https://sports-booking-eosin.vercel.app'], credentials: true })));


// Application routes
app.use('/api/', router);

app.get('/', (req: Request, res: Response) => {
    res.json('Welcome to Sports Booking');
});
app.use(globalErrorHandler)
// Not found route
app.use(notFound)
export default app;
