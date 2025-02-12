import { config } from "dotenv";
config();

export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
export const PAYPAL_API = process.env.PAYPAL_API;
export const FRONTEND_URL = process.env.FRONTEND_URL;

export const PORT = process.env.PORT || 1028;
export const HOST = "http://localhost:" + PORT;

export const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true',
};
