import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config.js";
import { dbConfig } from "./config.js";
import paymentRoutes from "./routes/payment.routes.js";
import pkg from 'pg';  
const { Client } = pkg; 
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const client = new Client(dbConfig);

client.connect()
    .then(() => console.log('Connected to CockroachDB'))
    .catch((err) => console.error('Connection error', err.stack));

app.use(paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server on port http://localhost:${PORT}`);
    console.log(`environment: ${process.env.NODE_ENV}`);
});
