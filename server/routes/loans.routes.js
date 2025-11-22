import { Router } from "express";
import {
  getLoans,
  getLoan,
  createLoan,
  updateLoan,
  deleteLoan,
  returnLoan,
} from "../controllers/loans.controllers.js";

const router = Router();

router.get("/loans", getLoans);
router.get("/loans/:id", getLoan);
router.post("/loans", createLoan);
router.put("/loans/:id", updateLoan);
router.put("/loans/:id/return", returnLoan);
router.delete("/loans/:id", deleteLoan);

export default router;
