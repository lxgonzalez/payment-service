import { Router } from "express";
import {
  createOrder,
  captureOrder,
  cancelPayment,
} from "../controllers/payment.controller.js";
import {
  savePaid
} from "../controllers/paidsave.controller.js";
const router = Router();

router.post("/create-order", createOrder);
router.get("/capture-order", captureOrder);
router.get("/cancel-order", cancelPayment);
router.post("/save-sale", savePaid);  
export default router;
