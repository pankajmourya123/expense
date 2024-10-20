import express from 'express';
import { addExpense, getUserExpenses, getOverallExpenses, downloadBalanceSheet } from '../controllers/expense.js';

const router = express.Router();

router.post('/expense', addExpense);
router.get('/expense/user/:userId', getUserExpenses);
router.get('/expense', getOverallExpenses);
router.get('/expense/download', downloadBalanceSheet);
export default router;
