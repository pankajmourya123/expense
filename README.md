## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory and add your environment variables.
4. Start the server with `npm start`.
### API Endpoints

- **User Management**
  - `POST /api/user` - Create a user
  - `GET /api/user/:id` - Get user details
  - `POST /api/login` - User login

- **Expense Management**
  - `POST /api/expense` - Add an expense
  - `GET /api/expense/user/:userId` - Get user expenses with pagination
  - `GET /api/expense` - Get overall expenses
  - `GET /api/expense/download` - Download balance sheet
