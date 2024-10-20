import express from 'express';
import connectDB from './config/database.js';
import userRoutes from './routes/users.js';
import expenseRoutes from './routes/expense.js';
import { errorMiddleware } from './middlewares/error.js';

const app = express();
connectDB();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', expenseRoutes);
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send({
      message: "Welcome to the covinAI",
      documentation: {
        "User Management": {
          "POST /api/user": "Create a user",
          "GET /api/user/:id": "Get user details",
          "POST /api/login": "User login"
        },
        "Expense Management": {
          "POST /api/expense": "Add an expense",
          "GET /api/expense/user/:userId": "Get user expenses with pagination",
          "GET /api/expense": "Get overall expenses",
          "GET /api/expense/download": "Download balance sheet"
        }
      }
    });
  });
export default app;
